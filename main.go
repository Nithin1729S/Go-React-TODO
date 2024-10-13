package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson" // For bson.M{} and other BSON operations
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Todo struct {
	ID        primitive.ObjectID    `json:"id,omitempty" bson:"_id,omitempty"`
	Completed bool   `json:"completed"`
	Body      string `json:"body"`
}

var collection *mongo.Collection

func main() {
	fmt.Println("Starting application...")

	// Load environment variables from .env file
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file:", err)
	}

	MONGODB_URI := os.Getenv("MONGODB_URI")
	if MONGODB_URI == "" {
		log.Fatal("MONGODB_URI is not set in the environment variables")
	}

	// Set client options and connect
	clientOptions := options.Client().ApplyURI(MONGODB_URI)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal("Failed to connect to MongoDB:", err)
	} 

	defer client.Disconnect(context.Background())

	// Ping the primary node to check the connection
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("Failed to ping MongoDB:", err)
	}

	fmt.Println("Connected to MongoDB Atlas")

	// Continue with your application logic
	collection = client.Database("golang_db").Collection("todos")

	app:=fiber.New()
	

	app.Get("/api/todos",getTodos)
	app.Post("/api/todos",createTodo)
	app.Patch("/api/todos/:id",updateTodo)
	app.Delete("/api/todos/:id",deleteTodo)

	port:=os.Getenv("PORT")
	if port == "" {
		port="5000"
	}
	log.Fatal(app.Listen("0.0.0.0:"+port))
}


func getTodos(c*fiber.Ctx)error{
	var todos[]Todo
	cursor,err := collection.Find(context.Background(),bson.M{}) //empty query
	if err!=nil {
		return err
	}

	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()){
		var todo Todo
		if err:=cursor.Decode(&todo); err!=nil{
			return err
		}
		todos=append(todos, todo)
	}
	return c.JSON(todos)
}

func createTodo(c*fiber.Ctx)error{
	todo:=new(Todo)
	if err:=c.BodyParser(todo); err !=nil{
		return err
	}
	if todo.Body==""{
		return c.Status(400).JSON(fiber.Map{"error":"Todo cant be empty"})
	}
	insertResult,err:=collection.InsertOne(context.Background(),todo)
	if err!=nil {
		return err
	}

	todo.ID=insertResult.InsertedID.(primitive.ObjectID)
	return c.Status(201).JSON(todo)

}

func updateTodo(c*fiber.Ctx)error{
	id:=c.Params("id")
	objectID,err:=primitive.ObjectIDFromHex(id)

	if err!=nil{
		return  c.Status(400).JSON(fiber.Map{"error":"Invalid todo ID"})
	}

	filter:=bson.M{"_id":objectID}
	update:=bson.M{"$set":bson.M{"completed":true}}

	_,err=collection.UpdateOne(context.Background(),filter,update)

	if err!=nil{
		return err
	}
	return c.Status(200).JSON(fiber.Map{"success":true})

}

func deleteTodo(c*fiber.Ctx)error{
	id:=c.Params("id")
	objectId,err:=primitive.ObjectIDFromHex(id)

	if(err!=nil){
		return  c.Status(400).JSON(fiber.Map{"error":"Invalid todo ID"})
	}

	filter := bson.M{"_id":objectId}
	_,err = collection.DeleteOne(context.Background(),filter)

	if err!=nil{
		return err
	}
	
	return c.Status(200).JSON(fiber.Map{"success":true})
	
}
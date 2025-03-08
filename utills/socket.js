import { Server } from "socket.io";

let io;

export function setupSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.use((socket, next) => {
    console.log("Socket Middleware: conexión recibida");
    next();
  });

  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado:", socket.id);
    socket.emit("message", "Bienvenido al servidor de productos del supermercado");

    socket.on("newProduct", (product) => {
      console.log("Nuevo producto recibido:", product);
      io.emit("productAdded", product);
    });
  });
}

export { io };
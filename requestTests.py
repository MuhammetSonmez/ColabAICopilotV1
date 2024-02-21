import websocket
import threading
import time

def on_message(ws, message):
    print(f"Received: {message}")

def on_error(ws, error):
    print(f"Error: {error}")

def on_close(ws):
    print("### closed ###")

def on_open(ws):
    def run(*args):
        ws.send("Hello, server!")
        time.sleep(1)
        ws.close()
        print("Thread terminating...")
    threading.Thread(target=run).start()

if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("ws://localhost:3000",
                                on_message = on_message,
                                on_error = on_error,
                                on_close = on_close)
    ws.on_open = on_open
    ws.run_forever()




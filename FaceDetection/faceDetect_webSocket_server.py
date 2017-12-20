from facedetector import FaceDetector
import pickle
import argparse
import cv2

import numpy as np
import threading
import json
from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket

server = None
clients = []
w = 320.0


# Encode the message to JSON
class IntegerEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, int):
            return json.JSONEncoder.default(self, o)
        return {'_python_object': pickle.dumps(o)}


# Simple webserver opening
class SimpleWSServer(WebSocket):
    def handleConnected(self):
        clients.append(self)

    def handleClose(self):
        clients.remove(self)


# Function to run the server call by thread
def run_server():
    global server
    server = SimpleWebSocketServer('', 9000, SimpleWSServer,
                                   selectInterval=(1000.0 / 15) / 1000)
    server.serveforever()


# Run the thread
t = threading.Thread(target=run_server)
t.start()

ap = argparse.ArgumentParser()
ap.add_argument("-f", "--face", required=True,
                help="path to where the face cascade resides")
ap.add_argument("-v", "--video",
                help="path to the (optional) video file")
args = vars(ap.parse_args())

fd = FaceDetector(args["face"])

if not args.get("video", False):
    camera = cv2.VideoCapture(0)

else:
    camera = cv2.VideoCapture(args["video"])

while True:
    (grabbed, frame) = camera.read()

    if args.get("video") and not grabbed:
        break

    img_height, img_width, depth = frame.shape
    scale = w / img_width
    h = img_height * scale
    frame = cv2.resize(frame, (0, 0), fx=scale, fy=scale)

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Face detection function is here
    faceRects = fd.detect(gray)
    frameClone = frame.copy()

    if faceRects is not None:
        for (fX, fY, fW, fH) in faceRects:
            cv2.rectangle(frameClone, (fX, fY), (fX + fW, fY + fH),
                          (0, 255, 0), 2)
            for client in clients:
                data = {'X': int(fX), 'Y': int(fY), 'W': int(fW), 'H': int(fH)}
                json_data = json.dumps(data, cls=IntegerEncoder)
                client.sendMessage(json_data)

    cv2.imshow("Face", frameClone)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

camera.release()
cv2.destroyAllWindows()
server.close()
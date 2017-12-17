from facedetector import FaceDetector
from library import imutils
import pickle
import argparse
import cv2

import numpy as np
import threading
import json
from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket

server = None
clients = []


class IntegerEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, int):
            return json.JSONEncoder.default(self, o)
        return {'_python_object': pickle.dumps(o)}

class SimpleWSServer(WebSocket):
    def handleConnected(self):
        clients.append(self)

    def handleClose(self):
        clients.remove(self)


def run_server():
    global server
    server = SimpleWebSocketServer('', 9000, SimpleWSServer,
                                   selectInterval=(1000.0 / 15) / 1000)
    server.serveforever()


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

    frame = imutils.resize(frame, width=300)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faceRects = fd.detect(gray, scaleFactor=1.1,
                          minNeighbors=5, minSize=(30, 30))
    frameClone = frame.copy()

    if faceRects is not None:
        for (fX, fY, fW, fH) in faceRects:
            cv2.rectangle(frameClone, (fX, fY), (fX + fW, fY + fH),
                          (0, 255, 0), 2)
            for client in clients:
                data = {}
                data['X'] = int(fX)
                data['Y'] = int(fY)
                data['W'] = int(fW)
                data['H'] = int(fH)
                json_data = json.dumps(data, cls=IntegerEncoder)
                client.sendMessage(json_data)


    cv2.imshow("Face", frameClone)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

camera.release()
cv2.destroyAllWindows()
server.close()

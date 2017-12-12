from facedetector import FaceDetector
from library import imutils
from library.videoStreamThread import FileVideoStream
import argparse
import cv2
import time

# construct the argument parse and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-f", "--face", required=True,
                help="path to where the face cascade resides")
ap.add_argument("-v", "--video",
                help="path to the (optional) video file")
args = vars(ap.parse_args())

fd = FaceDetector(args["face"])

# camera = FileVideoStream(0).start()

# if not args.get("video", False):
#     camera = FileVideoStream(0).start()
# else:
camera = FileVideoStream(args["video"]).start()

time.sleep(1.0)

# loop over frames from the video file stream
while camera.more():
    # grab the frame from the threaded video file stream


    # (grabbed, frame) = camera.read()
    #
    # if args.get("video") and not grabbed:
    #     break

    frame = camera.read()

    frame = imutils.resize(frame, width=300)

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faceRects = fd.detect(gray, scaleFactor=1.1,
                          minNeighbors=5, minSize=(30, 30))
    frameClone = frame.copy()

    for (fX, fY, fW, fH) in faceRects:
        cv2.rectangle(frameClone, (fX, fY), (fX + fW, fY + fH),
                      (0, 255, 0), 2)

    cv2.imshow("Face", frameClone)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break


cv2.destroyAllWindows()
camera.stop()

from cv2 import cv2
import base64
import io
from PIL import Image
import numpy as np


class SmileDetector:
    face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
    smile_cascade = cv2.CascadeClassifier('haarcascade_smile.xml')

    def process_files(self, images):
        smiles_sum = 0
        for img in images:
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            faces = self.face_cascade.detectMultiScale(gray, 1.3, 5)
            # Face detection
            for (x, y, w, h) in faces:
                cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)
                roi_gray = gray[y:y + h, x:x + w]
                roi_color = img[y:y + h, x:x + w]
                # smile detection
                smile = self.smile_cascade.detectMultiScale(
                    roi_gray,
                    scaleFactor=1.7,
                    minNeighbors=22,
                    minSize=(25, 25),
                    flags=cv2.CASCADE_SCALE_IMAGE
                )
                # Set region of interest for smiles
                for (x, y, w, h) in smile:
                    smiles_sum = smiles_sum + len(smile)
                    # cv2.rectangle(roi_color, (x, y), (x + w, y + h), (0, 0, 255), 1)

        return smiles_sum

    @staticmethod
    def convert_files(files):
        images = []

        for file in files:
            file = file.split("base64,")[-1]
            b64_string = base64.b64decode(file)
            image = Image.open(io.BytesIO(b64_string))
            img = cv2.cvtColor(np.array(image), cv2.COLOR_BGR2RGB)
            images.append(img)

        return images

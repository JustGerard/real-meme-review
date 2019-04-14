import json
import os

import googleapiclient.discovery
import isodate as isodate
import requests
from googleapiclient.errors import HttpError
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.support.ui import WebDriverWait


class VideoItem:
    def __init__(self, __id, duration):
        self.duration = duration
        self.video_id = __id

    def __str__(self):
        return "Video: " + str(self.video_id) + " Duration[s]: " + str(self.duration)


def send_video_to_database(video):
    payload = {'url': video.video_id, 'length': video.duration}
    try:
        requests.post(addres + "/api/insert/", data=payload)
    except:
        pass


def crawl_youtube_api(__id, depth):
    if depth >= max_depth:
        return
    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, developerKey=DEVELOPER_KEY)
    req = youtube.search().list(
        part="snippet",
        relatedToVideoId=__id,
        type="video",
        videoDuration="short"
    )
    try:
        response = req.execute()
    except HttpError:
        return
    releted_videos = []
    for item in response['items']:
        payload = {'id': item["id"]["videoId"], 'part': 'contentDetails,statistics,snippet',
                   'key': DEVELOPER_KEY}
        resp = requests.Session().get('https://www.googleapis.com/youtube/v3/videos', params=payload)
        resp_dict = json.loads(resp.content)
        resp_duration = resp_dict['items'][0]['contentDetails']['duration']
        duration = int(isodate.parse_duration(resp_duration).total_seconds())
        if duration < duration_limit:
            releted_videos.append(VideoItem(item["id"]["videoId"], duration))
    if len(releted_videos) > 0:
        for video in releted_videos:
            send_video_to_database(video)
            video_list.append(video)
            crawl_youtube_api(video.video_id, depth + 1)
    else:
        crawl_youtube_api(response['items'][0]["id"]["videoId"], depth + 1)


def crawl_selenium(__id):
    request = "https://www.youtube.com/watch?v="
    to_visit = []
    to_visit.append(__id)
    recommended = []
    text = "/watch?v="
    muted = False
    while True:
        curr = to_visit[0]
        browser.get(request + curr)
        to_visit = to_visit[1:]
        wait = WebDriverWait(browser, 1)
        if not muted:
            mute_button = wait.until(ec.visibility_of_element_located((By.CLASS_NAME, "ytp-mute-button")))
            mute_button.click()
            muted = True
        try:
            time = wait.until(ec.visibility_of_element_located((By.CLASS_NAME, "ytp-time-duration"))).text
        except:
            continue
        try:
            wait.until(ec.visibility_of_element_located((By.CLASS_NAME, "ytp-ad-preview-container")))
            ad = True
        except:
            ad = False
            pass
        duration = int(int(time.split(':')[-1]) + int(time.split(":")[0]) * 60)
        if duration <= duration_limit and not ad:
            # recommended.append(VideoItem(curr, duration))
            send_video_to_database(VideoItem(curr, duration))
            print("Saved video with id: " + curr)
        temp = []
        while len(temp) == 0:
            elements = browser.find_elements_by_xpath('//a[contains(@href, "' + text + '")]')
            elements = elements[1:]
            for elem in elements:
                if "list" not in elem.get_attribute('href') and "?t=" not in elem.get_attribute('href'):
                    temp.append(elem.get_attribute('href'))
        for elem in temp:
            to_visit.append(elem.split('watch?v=')[-1])
        to_visit = list(set(to_visit))


if __name__ == "__main__":
    video_list = []
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
    api_service_name = "youtube"
    api_version = "v3"
    starting_link = "https://www.youtube.com/watch?v=EWF8Nfm-LLk"
    link_id = starting_link.split('watch?v=')[-1]
    DEVELOPER_KEY = "AIzaSyDyWdWKIvAGNNYI0mOCmTVWrDlXnaOVdAg"
    duration_limit = 60 * 4
    max_depth = 100
    to_visit_limit = 100
    addres = "https://real-meme-review.herokuapp.com"
    # crawl_youtube_api(link_id, 0)
    browser = webdriver.Firefox()
    crawl_selenium(link_id)

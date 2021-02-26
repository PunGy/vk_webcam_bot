#include "opencv2/opencv.hpp"
#include <iostream>
#include <time.h>

using namespace std;
using namespace cv;

int main(int argc, char **argv){
    VideoCapture vcap("/dev/video0");
    size_t fps = 15;

    vcap.set(CAP_PROP_FPS, fps);
    vcap.set(CAP_PROP_FRAME_WIDTH, 1920);
    vcap.set(CAP_PROP_FRAME_HEIGHT, 1080);

    time_t current_time;
    time(&current_time);
    long secondsWrite { 10 };

    if (argc > 1) {
        secondsWrite = stoi(argv[1]);
    }
    long endTime = current_time + secondsWrite + 2;

    if(!vcap.isOpened()){
        cout << "Error opening video stream or file" << endl;
        return -1;
    }

    double frame_width { vcap.get(CAP_PROP_FRAME_WIDTH) };
    double frame_height{ vcap.get(CAP_PROP_FRAME_HEIGHT) };

    VideoWriter video("out.avi",cv::VideoWriter::fourcc('M','J','P','G'), fps, Size(frame_width,frame_height), true);

    for(;;){
        Mat frame;
        vcap >> frame;
        video.write(frame);
        time(&current_time);
        if (current_time >= endTime) break;
    }
    return 0;
}

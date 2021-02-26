#include "opencv2/opencv.hpp"
#include <chrono>
#include <thread>

using namespace std;
using namespace cv;

int main(int argc, char **argv) {
    VideoCapture vcap("/dev/video0");

    vcap.set(CAP_PROP_FRAME_WIDTH, 1920);
    vcap.set(CAP_PROP_FRAME_HEIGHT, 1080);

    if(!vcap.isOpened()){
        cout << "Error opening video stream or file" << endl;
        return -1;
    }

    double frame_width { vcap.get(CAP_PROP_FRAME_WIDTH) };
    double frame_height{ vcap.get(CAP_PROP_FRAME_HEIGHT) };

    this_thread::sleep_for(chrono::milliseconds(200));
    Mat frame;
    vcap >> frame;
    vector<int> image_params;
    image_params.push_back(IMWRITE_JPEG_QUALITY);
    image_params.push_back(100);
    image_params.push_back(IMWRITE_JPEG_PROGRESSIVE);
    image_params.push_back(1);
    image_params.push_back(IMWRITE_JPEG_RST_INTERVAL);
    image_params.push_back(100);
    imwrite("webcam_output.jpg", frame, image_params);

    vcap.release();
    return 0;
}

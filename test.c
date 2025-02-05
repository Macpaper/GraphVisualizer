#include <stdio.h>

int main() {
    signed char c = -128;
    signed char c2 = 127;
    signed char res = -c - c2;
    // c *= -1;
    printf("here: %d", (res));
    return 0;
}
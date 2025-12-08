#!/bin/bash
# Script to optimize video for web use
# Converts MOV to WebM and MP4 (H.264) for better browser compatibility and smaller file sizes

VIDEO_INPUT="public/cloudsloop.mov"
VIDEO_OUTPUT_WEBM="public/cloudsloop.webm"
VIDEO_OUTPUT_MP4="public/cloudsloop.mp4"

echo "Optimizing video for web..."
echo "This requires ffmpeg to be installed"

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "Error: ffmpeg is not installed"
    echo "Install with: brew install ffmpeg"
    exit 1
fi

# Convert to WebM (VP9 codec, smaller file size, good quality)
echo "Converting to WebM (VP9)..."
ffmpeg -i "$VIDEO_INPUT" \
  -c:v libvpx-vp9 -crf 30 -b:v 0 \
  -c:a libopus -b:a 128k \
  -movflags +faststart \
  -y "$VIDEO_OUTPUT_WEBM"

# Convert to MP4 (H.264 codec, better compatibility)
echo "Converting to MP4 (H.264)..."
ffmpeg -i "$VIDEO_INPUT" \
  -c:v libx264 -crf 23 -preset slow \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  -y "$VIDEO_OUTPUT_MP4"

echo ""
echo "✅ Video optimization complete!"
echo "WebM: $VIDEO_OUTPUT_WEBM"
echo "MP4: $VIDEO_OUTPUT_MP4"
echo ""
echo "File sizes:"
ls -lh "$VIDEO_OUTPUT_WEBM" "$VIDEO_OUTPUT_MP4" 2>/dev/null | awk '{print $5, $9}'

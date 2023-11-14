import requests

url = "http://127.0.0.1:8000/generate-art"
payload = {
    "prompt": "front view ultra detailed goddess sita with White holographic Sari flying, Smooth long dress, Goddess Sita - Divine beauty, Radiant complexion - Golden and pure, Expressive eyes - Compassionate and wise, Lustrous hair - Dark and flowing, Ornate hair ornaments - Floral and decorative, Graceful figure - Elegance and poise Vibrant saree - Blue or red with intricate patterns Serene expression - Wisdom and resilience Lotus flower - Symbol of purity and enlightenmentDivine aura - Captivating and ethereal focus on face, dynamic pose, holographic, light particles, ultra detailed illustration by  illustration by loish and artgerm, wlop, hit definition, 32k resolution, volumetric lighting, “best quality”, “masterpiece"" Full body, focus on face, best quality face, holographic, intricately detailed, Black Hair, Disney Style, Indian background, queen"
}
response = requests.post(url, json=payload)

print(response.json())

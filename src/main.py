"""FastAPI application - /generate and /analyse-image endpoints."""

from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from .models import (
    GenerateRequest,
    GenerateResponse,
    ImageAnalyseResponse,
    StyleDimensions,
)
from .orchestrate import analyse_image, generate

app = FastAPI(title="SD Copy Transformer")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/generate", response_model=GenerateResponse)
async def generate_endpoint(request: GenerateRequest) -> GenerateResponse:
    return await generate(request.input_text, request.style)


@app.post("/analyse-image", response_model=ImageAnalyseResponse)
async def analyse_image_endpoint(
    image: UploadFile = File(...),
    text: str = Form(""),
    tone: str = Form("aspirational_warm"),
    audience: str = Form("couples_friends"),
    formality: str = Form("elegant_editorial"),
    detail_style: str = Form("sensory_evocative"),
) -> ImageAnalyseResponse:
    image_bytes = await image.read()
    style = StyleDimensions(
        tone=tone, audience=audience, formality=formality, detail_style=detail_style
    )
    return await analyse_image(
        image_bytes, style, text=text if text.strip() else None
    )

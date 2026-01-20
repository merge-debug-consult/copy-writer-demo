# Data Analytics Project Template

Standardized project structure for data analytics projects. Speeds up initialization and ensures consistency across projects.

## Project Structure

```
project_template/
├── data/
│   ├── raw_data/          # Original, immutable data
│   ├── processed_data/    # Cleaned/transformed data
│   └── output_data/       # Analysis outputs, reports
├── src/                   # Main source code
├── tests/                 # Unit tests for src/
├── utils/                 # Common utility functions
│   └── utils.py
├── config.yaml            # Project configuration
├── .env.example           # Environment variables template
├── pyproject.toml         # Dependencies
└── README.md
```

## Quick Start

```bash
# 1. Set up environment with uv
uv venv
.venv\Scripts\activate     # Windows
source .venv/bin/activate  # Mac/Linux
uv pip install -e .

# 2. Configure environment
cp .env.example .env       # Edit with your credentials

# 3. Customize config.yaml for your project
```

## Best Practices

**Data Management**
- Never commit data files to git (gitignored by default)
- Keep raw data in `raw_data/` - never modify
- Store processed data in `processed_data/`
- Save outputs in `output_data/`

**Code Organization**
- Main code goes in `src/`
- Shared functions in `utils/`
- Tests in `tests/`
- Use notebooks for exploration, move production code to `src/`

**Configuration**
- Settings in `config.yaml` (can be committed)
- Secrets in `.env` (never commit)

## Using uv

```bash
uv pip install package-name    # Install package
uv pip install -e .            # Install project
uv pip install -e ".[dev]"     # Install with dev dependencies
uv venv                        # Create new environment
```

## Managing Dependencies (pyproject.toml)

**Easy way - use `uv add` (recommended):**
```bash
uv add requests                    # Add and install package
uv add pandas numpy scikit-learn   # Add multiple packages
uv add --dev pytest black ruff     # Add to dev dependencies
```

This automatically updates `pyproject.toml` and installs the package.

**Manual way:**
Edit `pyproject.toml` directly, then run `uv pip install -e .`

**Capture current environment:**
```bash
uv pip freeze                      # See what's installed
uv pip compile pyproject.toml -o requirements.txt  # Generate lock file
```

**Common packages for data analytics:**
- Web scraping: `beautifulsoup4`, `scrapy`, `playwright`
- APIs: `requests`, `httpx`, `fastapi`
- ML: `scikit-learn`, `xgboost`, `lightgbm`
- LLMs: `openai`, `anthropic`, `langchain`
- Data viz: `matplotlib`, `seaborn`, `plotly`

## Project Customization

1. Update this README with project details
2. Rename project in `pyproject.toml`
3. Add dependencies to `pyproject.toml`
4. Customize `config.yaml`
5. Copy `.env.example` to `.env` and add credentials

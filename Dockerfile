# ==========================================
# STAGE 1: Frontend Build
# ==========================================
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./

ARG NEXT_PUBLIC_API_URL=http://localhost:8000
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

# ==========================================
# STAGE 2: Frontend Runner
# ==========================================
FROM node:20-alpine AS frontend-runner
WORKDIR /app/frontend

COPY --from=frontend-build /app/frontend ./

EXPOSE 3000
CMD ["npm", "start"]

# ==========================================
# STAGE 3: Backend Runner
# ==========================================
FROM python:3.11-slim AS backend-runner
WORKDIR /app/backend

COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
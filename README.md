# Plant Disease Detection App

An Expo (React Native) app that identifies a plant disease from a leaf photo and lets you ask an AI assistant follow-up questions about it.

- **On-device detection:** a bundled ONNX model (`src/assets/models/plant_disease.onnx`) classifies the photo offline into 38 crop/disease classes.
- **Local disease info:** symptoms, treatment and prevention shown without internet (`src/data/disease.ts`). Not every class has an entry yet.
- **AI chat:** online follow-up questions, answered by the companion API in the `pbl-plant-disease` repository (`plant disease detection server/server`).

The app is native-only (Android/iOS). The ONNX runtime does not run in a browser, so there is no web target.

## Setup

1. Install dependencies

   ```bash
   npm install
   ```

2. Point the app at the API: copy `.env.example` to `.env` and set `EXPO_PUBLIC_API_URL`.
   On a real phone use your computer's LAN IP (for example `http://192.168.1.10:3000`), not `localhost`.
   Release builds only allow HTTPS, so deploy the API behind TLS for production.

3. Start the API (see its `.env.example`), then run a development build:

   ```bash
   npx expo run:android   # or: npx expo run:ios
   npx expo start
   ```

   `onnxruntime-react-native` is a native module, so Expo Go cannot run this app; use a development build.

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Start the Metro dev server |
| `npm run android` / `npm run ios` | Build and run a native development build |
| `npm run typecheck` | Type-check with TypeScript |
| `npm run lint` | Lint with Expo's ESLint config |

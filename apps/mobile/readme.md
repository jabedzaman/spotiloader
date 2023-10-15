# Spotiloader

Expo Client to download music from spotify, youtube, etc...

## Building Locally

> [!NOTE]  
> Expo SDK 41 > no longer supports `expo build:android` and `expo build:ios` commands. To build the app locally, you must first eject the app from Expo and then build it using the Android Studio or Xcode IDEs.

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Java JDK](https://www.oracle.com/java/technologies/javase-downloads.html)
- [Gradle](https://gradle.org/install/)
- [Android Studio](https://developer.android.com/studio)
- [Yarn](https://yarnpkg.com/)
- [ADB](https://developer.android.com/studio/command-line/adb)

### Clone the Repository

```bash
git clone https://github.com/jabedzaman/spotiloader.git
cd spotiloader
```

### Install Dependencies

```bash
yarn install
```

### Run Expo Eject

```bash
cd apps/mobile
npx expo eject
```

### Build Android APK

```bash
./gradlew assembleRelease
```

### Install APK on Android Device

```bash
adb install app/build/outputs/apk/release/app-release.apk
```

# [Kelas React Native - Basic]

## 1. Installation
```
$ npm install
```

## 2. Running
```
$ react-native run-android
$ react-native start
```

## 3. Debugging (android)

### 3.1. If device lost connection:
```
$ adb reverse tcp:8081 tcp:8081
```
And try reload your application in your device/emulator again.

### 3.2. Unable to shake your device:
```
$ adb shell input keyevent 82
```


gradlew assembleRelease

open-im-sdk-rn构建错误
android/build.gradle  末尾增加
configurations.all {
        resolutionStrategy {
            force 'androidx.core:core:1.6.0'
            force 'androidx.core:core-ktx:1.6.0'
        }
        
    }
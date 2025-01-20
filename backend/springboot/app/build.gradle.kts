plugins {
    id("org.springframework.boot") version "3.2.1"
    id("io.spring.dependency-management") version "1.1.4"
    id("java")
}

group = "com.vitalnest"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.postgresql:postgresql")


    developmentOnly("org.springframework.boot:spring-boot-devtools")


    testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.named<Jar>("bootJar") {
    enabled = true
    exclude("org/springframework/boot/devtools/**")
}

tasks.named<Test>("test") {
    useJUnitPlatform()
}


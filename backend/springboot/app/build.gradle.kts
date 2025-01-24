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
    // Starter para aplicaciones web
    implementation("org.springframework.boot:spring-boot-starter-web")

    // Starter para JPA/Hibernate
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")

    // Driver para PostgreSQL
    runtimeOnly("org.postgresql:postgresql:42.2.23")

    // Lombok para reducir código boilerplate
    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")

    // Herramientas de desarrollo para reinicios automáticos
    developmentOnly("org.springframework.boot:spring-boot-devtools")

    // Dependencias para pruebas
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.named<Jar>("bootJar") {
    enabled = true
    exclude("org/springframework/boot/devtools/**")
}

tasks.named<Test>("test") {
    useJUnitPlatform()
}

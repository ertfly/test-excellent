# Project Description
Test Excellent Sistemas

# Requirements
- Docker
- Docker Compose (version '2')

# Understanding the structure
```
.
+-- front (folder ReactJS frontend)
+-- back (folder backend PHP laravel)
```

# Installation Instructions #
- Clone project
```
git clone git@github.com:ertfly/test-excellent.git
```

# Access folder product
```
cd test-excellent
```

# Copy samples files setting in folder "back"
```
cd back
cp .env.example .env
```

# Copy samples files setting in folder "front"
```
cd ..
cd front/
cp sample.env .env
```

> **_NOTA:_**  This commands are linux or unix.

# Back folder and copy docker-compose files samples
```
cd ..
cp docker-compose.sample.yml docker-compose.yml
```

> **_NOTA:_**  Check defined external ports containers

# Build containers
```
docker-compose build
```

# Run containers
```
docker-compose up
```
> **_NOTA:_**  Wait full runing, when start serve build front access http://localhost:3000

> **_NOTA:_**  When vendor or node_modules install error, use zip files in folder back and front.

# User access
```
Email: test@test.com
Password: 123
```
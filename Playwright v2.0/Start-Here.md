# Start Here: Pre-Course Setup & Prerequisites

Welcome, Karan! This guide will help you set up everything you need before starting the 25-day Automation Testing course.

---

## ✅ **Pre-Course Checklist**

Before you start Day 01, complete these setup tasks:

### **System Requirements**
- [ ] Windows 11, macOS 14+, or Linux (Ubuntu 22.04+)
- [ ] Minimum 8GB RAM (16GB recommended)
- [ ] 50GB free disk space (for tools, Docker images, code)
- [ ] Stable internet connection (5+ Mbps)

### **Hardware Recommendations for Berlin Tech Market**
Since you're targeting Germany, these specs are ideal for German tech companies:
- [ ] Intel i5/i7 or AMD Ryzen 5/7 processor
- [ ] SSD storage (at least 256GB for Docker and development)
- [ ] Multiple monitors setup (common in Berlin offices)
- [ ] External keyboard & mouse (productivity standard)

---

## 🔧 **Software Installation & Setup**

### **Step 1: Install Node.js (1 hour)**

**Why Node.js?** It powers both Playwright and Cypress, the course's primary frameworks.

#### **Windows/macOS:**
1. Visit [nodejs.org](https://nodejs.org)
2. Download **LTS version (v20.x, v22.x, or v24.x)**
3. Run installer, follow defaults
4. Verify installation:
```bash
node --version      # Should show v20.x or higher
npm --version       # Should show 10.x or higher
npx --version       # Should show 10.x or higher
```

#### **Ubuntu/Linux:**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version
npm --version
```

---

### **Step 2: Install Git & Configure (30 minutes)**

**Why Git?** All course projects use GitHub for version control.

1. Download from [git-scm.com](https://git-scm.com)
2. Install with default settings
3. Configure Git:
```bash
git config --global user.name "Karan Joshi"
git config --global user.email "your-email@example.com"
git config --global core.autocrlf true  # Windows-specific
git --version  # Verify
```

4. Generate SSH key for GitHub:
```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
cat ~/.ssh/id_ed25519.pub  # Copy this key
```

5. Add SSH key to GitHub: Settings > SSH and GPG keys > New SSH key

---

### **Step 3: Install VS Code (45 minutes)**

**Why VS Code?** Industry standard editor for automation testing.

1. Download from [code.visualstudio.com](https://code.visualstudio.com)
2. Install with default settings
3. Open VS Code and install these **essential extensions:**

| Extension | Why | Install Command |
|-----------|-----|-----------------|
| Playwright Test | Framework support | `Playwright Test for VSCode` |
| JavaScript (ES6) | Syntax highlighting | Built-in |
| Python | Python support (Day 14) | `Python` extension |
| Git Graph | Git visualization | `Git Graph` extension |
| REST Client | API testing | `REST Client` extension |
| Docker | Docker management | `Docker` extension |

**Install extensions:**
- Open VS Code
- Press `Ctrl+Shift+X` (Extensions)
- Search each extension, click Install

---

### **Step 4: Create Project Directory (15 minutes)**

Setup your workspace:

```bash
# Create main project directory
mkdir ~/automation-testing-course
cd ~/automation-testing-course

# Create subdirectories
mkdir -p projects/{day1-5,day6-11,day12-15,day16-20,day21-25}
mkdir -p notes
mkdir -p resources

# Create local git repo
git init
```

---

### **Step 5: Install Docker (1.5 hours)**

**Why Docker?** Essential for Jenkins, containerized testing (Day 16+).

#### **Windows:**
1. Download [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)
2. Run installer, enable WSL 2 (Windows Subsystem for Linux)
3. Restart computer
4. Verify:
```bash
docker --version
docker run hello-world
```

#### **macOS:**
1. Download [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop)
2. Drag app to Applications folder
3. Launch, provide password
4. Verify:
```bash
docker --version
docker run hello-world
```

#### **Ubuntu/Linux:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker
docker --version
docker run hello-world
```

---

### **Step 6: Setup Postman (30 minutes)**

**Why Postman?** Industry standard for API testing (Day 12-15).

1. Download [Postman Desktop App](https://www.postman.com/downloads/)
2. Create free Postman account
3. Sign in to Postman
4. Create workspace: "AutomationCourse"
5. Create collection: "API Tests"

---

### **Step 7: Install Python (30 minutes)**

**Why Python?** Supplementary for API testing and scripting (Day 14-15).

#### **Windows/macOS:**
1. Download from [python.org](https://www.python.org) (v3.10+)
2. Install with "Add Python to PATH" enabled
3. Verify:
```bash
python --version  # or python3 --version
pip --version
```

#### **Ubuntu/Linux:**
```bash
sudo apt update
sudo apt install -y python3 python3-pip
python3 --version
pip3 --version
```

---

### **Step 8: Create GitHub Repository (20 minutes)**

All course projects go here. This becomes your portfolio!

1. Visit [github.com/new](https://github.com/new)
2. Repository name: `automation-testing-portfolio`
3. Description: "25-Day Automation Test Engineer Upskilling Course Projects"
4. Make it **Public** (for portfolio visibility)
5. Add README.md
6. Clone locally:
```bash
cd ~/automation-testing-course
git clone https://github.com/YOUR_USERNAME/automation-testing-portfolio.git
cd automation-testing-portfolio
```

---

### **Step 9: Verify Complete Setup (30 minutes)**

Run this verification script to ensure everything works:

```bash
# Create a verification file
echo "Testing all installations..."

echo "✓ Node.js:"
node --version
npm --version

echo "✓ Git:"
git --version

echo "✓ Docker:"
docker --version

echo "✓ Python:"
python3 --version

echo "✓ VS Code:"
code --version

echo "✓ Directory structure:"
ls -la ~/automation-testing-course

echo "✓ All setup complete!"
```

---

## 🧪 **Quick Test: Create First Playwright Project**

Before starting Day 01, test your setup:

```bash
# Navigate to project folder
cd ~/automation-testing-course/projects/day1-5

# Initialize Playwright project
npm init playwright@latest test-project
# Choose: TypeScript, tests folder, yes to GitHub Actions, yes to browsers

# Enter project directory
cd test-project

# Run example test
npx playwright test

# View HTML report
npx playwright show-report
```

**Expected Result:** Test runs successfully, report opens in browser.

If this works, your environment is ready! ✅

---

## 📚 **Pre-Course Learning Resources**

Before Day 01, review these (2-3 hours total):

### **JavaScript Basics** (If completely new)
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) - Sections 1-4
- [JavaScript.info](https://javascript.info) - Chapters 1-5

### **Web Technology Fundamentals**
- Understand HTTP (requests/responses)
- Know what REST means
- Basic understanding of DOM (HTML structure)

### **Testing Concepts** (From your manual testing experience)
- Test case design
- Test scenario development
- Defect reporting
- QA best practices

You already have this from 3+ years of testing! This course builds on it.

---

## 💡 **Important Course Setup Notes**

### **Time Management**
- **Daily schedule:** 8 hours per day
- **Morning:** 2 hours theory + 3 hours exercises
- **Evening:** 2-3 hours projects
- **Rest days:** Weekends for review/catch-up

### **German Tech Market Context**
- Focus on **English-speaking** documentation (German tech uses English)
- Setup assumes **Linux/WSL2** (common in Berlin offices)
- Emphasis on **clean code & documentation** (German standard)
- DevOps practices are **critical** in German tech companies

### **Salary & Career Context** (For Motivation)
- Current: Manual QA in India (~₹36,000/month)
- After course: Automation QA in Germany (~€3,500-4,500/month)
- **Your investment:** 25 days of intensive learning
- **Your return:** 20-30% salary increase + career stability

---

## 🔔 **Daily Routine Recommendation**

### **Morning (8:00 AM - 10:00 AM): Theory**
- Read day's learning objectives
- Study concepts with code examples
- Take notes in your learning journal
- Review any prerequisite knowledge

### **Late Morning (10:00 AM - 1:00 PM): Exercises**
- Complete all hands-on coding exercises
- Type out every code example (don't copy-paste)
- Test in your local environment
- Debug any issues

### **Afternoon (1:00 PM - 6:00 PM): Projects**
- Work on portfolio projects
- Apply day's learning in real context
- Update GitHub repository
- Get stuck? Review theory or search documentation

### **Evening (6:00 PM - 7:00 PM): Assessment**
- Answer MCQs & quizzes
- Review day's content summary
- Update Daily Checklist
- Plan next day topics

---

## 🎯 **Success Metrics**

Track your progress:

| Metric | Target | Check |
|--------|--------|-------|
| Daily completion | 5/5 days per week | ✓ |
| Quiz score | 80%+ | ✓ |
| Code exercises | 100% attempted | ✓ |
| Projects | On schedule | ✓ |
| GitHub commits | 5+ per day | ✓ |

---

## 🚀 **Day 1 Quick Preview**

What you'll learn on Day 01:

- **Topic:** JavaScript Fundamentals Part 1
- **Content:** Variables, data types, operators, control flow
- **Practical:** Build 5 small scripts
- **Project Start:** Directory structure setup
- **Time Estimate:** 8 hours total

---

## ❓ **Troubleshooting Pre-Setup**

### **Docker won't start**
```bash
# Windows: Enable Hyper-V
# Or use WSL 2 backend
docker run hello-world
```

### **npm installation slow**
```bash
# Use faster npm registry
npm config set registry https://registry.npmmirror.com
```

### **Git SSH key issues**
```bash
# Test connection
ssh -T git@github.com
# Should say "Hi [username]! You've successfully authenticated."
```

### **VS Code extensions not installing**
- Update VS Code to latest version
- Check internet connection
- Try installing via command line: `code --install-extension <extension-id>`

---

## 📞 **Quick Setup Help**

If stuck, debug by:
1. **Check VS Code Terminal:** Copy error messages
2. **Google the exact error:** Most issues have solutions online
3. **Visit tool documentation:** Node.js, Docker, Git official docs
4. **Check your paths:** Ensure tools are in system PATH

---

## ✨ **Ready to Start?**

Once you've completed:
- ✅ All system installations verified
- ✅ GitHub repository created
- ✅ First Playwright test runs successfully
- ✅ VS Code configured with extensions
- ✅ Docker running properly

**You're ready to begin Day 01!**

---

## 🎓 **Pre-Course Study Materials**

### **Recommended Reading (Optional but helpful)**
1. **JavaScript:** "You Don't Know JS" (free online)
2. **Web APIs:** W3C WebDriver Standard (overview)
3. **Testing:** ISTQB Fundamentals (your background covers this)

### **Mindset for Success**
- Type every code example (builds muscle memory)
- Don't skip exercises (they're essential)
- Break things, then fix them (learning happens here)
- Document your learnings (helps long-term memory)
- Network in Berlin QA community (LinkedIn, meetups)

---

## 🌍 **Berlin Tech Community**

Get connected (start now!):
- **LinkedIn:** Follow Berlin QA/Automation professionals
- **Meetups:** Berlin JavaScript, Testing meetups (post-course)
- **Communities:** QA.Cafe, Test Automation subreddits
- **Conferences:** TestBash, JAX (European conferences)

---

## 📝 **Next Steps**

1. **Today:** Complete all setup steps (sections 1-9)
2. **Tomorrow (Day 1):** Start learning JavaScript fundamentals
3. **Day 5:** First portfolio project begins
4. **Day 12:** API testing starts
5. **Day 25:** Ready for Berlin job market

---

## 🏆 **Your Course Guarantee**

By following this setup guide and completing all 25 days:

✅ You'll be **Playwright certified** (LambdaTest)  
✅ You'll be **Cypress certified** (LambdaTest)  
✅ You'll have **5 portfolio projects** on GitHub  
✅ You'll be **interview-ready** for Germany tech companies  
✅ You'll have **2-3x salary increase** potential  

---

**Let's begin! Start Day 01 when you're ready.** 🚀

---

*Last Updated: December 12, 2025*  
*Pre-Course Setup Guide v1.0*  
*Total Setup Time: ~6-8 hours*

---

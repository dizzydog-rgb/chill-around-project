## Git 及 Vite 操作說明

### 1\. 克隆專案 (Clone the repository)

- 請遵循以下步驟，將專案從 GitHub 複製到你的本地開發環境：
  1. 打開終端或命令提示字元
  2. 使用`cd`進入到你想要存放專案的資料夾
  3. 使用以下命令進行克隆：
  ```
  git clone https://github.com/dizzydog-rgb/chill-around-project.git
  ```
- 進入專案資料夾：
  ```
  cd chill-around-project
  ```
- 注意事項: `git clone` 指令只會下載主分支的檔案，若要和自己的分支同步，請參考 第6點 的常用指令 (Other Commands)，透過切換分支以及`git pull`來與目標分支的檔案同步

### 2\. 使用 npm 安裝專案依賴 (Install dependencies)

- 在專案資料夾內，開啟終端機，並執行以下命令安裝專案的依賴：
  ```
  npm install
  ```
- 這將會根據 `package.json` 安裝專案所需的所有套件。

### 3\. 開發模式 (Development Mode)

- 使用 Vite 開發專案，使用 VScode 開啟專案資料夾，開啟終端機並執行以下命令啟動開發伺服器：
  ```
  npm run dev
  ```
- 這個命令將會啟動開發模式。你可以在瀏覽器中打開顯示的本地網址來查看專案。

### 4\. 編輯代碼與提交更改 (Edit and commit code)

####

1. **創建新分支 (Create a new branch)**

   - 為了避免直接在主分支上進行修改，請在本地創建一個新的分支：
   - `git checkout -b your-branch-name`
   - **your-branch-name** 可以用來描述這個分支的用途，例如 `feature/homepage` 或 `bugfix/login`.

2. **編輯代碼 (Edit code)**

   - 現在你可以進行代碼修改與開發，例如新增 html 檔案。

3. **提交修改 (Commit changes)**

   - 編輯完代碼後，編輯完代碼後，在終端機使用 ctrl + c 關閉開發模式，並執行以下命令將更改提交到 gitHub 上：

   ```
   git init // 初始化網站空間，若已經初始化過就可以不用輸入
   git add . // 把左邊那些檔案都準備加到網站空間
   git commit -m "first comment" // 將本次更新打包，並加上註解
   git remote add origin https://github.com/dizzydog-rgb/chill-around-project.git // 選定遠端的網站空間名稱
   git branch -M main // 建立main分支 // 我已經有建立main分支，可以跳過此步驟
   git push -u origin main // 上傳到網站空間的主分支 // 僅限第一次輸入，往後上傳到main只需要輸入 git push
   git push -u origin your-branch-name // 上傳到網站空間的你的分支(your-branch-name) // 僅限第一次輸入，往後上傳到相同分支只需要輸入 git push
   ```

   - 再次提交開發環境

   ```
   git add .
   git commit -m 'update'
   git push // 第二次之後用這個指令直接推就可以了，會推到先前設定的分支
   ```

4. 提交到部署環境(gh-pages)
   - `git push`完後，可以提交到部署環境(gh-pages)，用於在 gitHub Pages 展示頁面
   ```
   npm run deploy
   ```

### 5\. 提交 Pull Request (Create a Pull Request)

- 登入 GitHub 並進入專案頁面。
- 點擊 **Pull Requests**，然後點擊 **New Pull Request**。
- 選擇你剛剛推送的分支，並發起 Pull Request 以合併你的修改。
- 專案管理者會審核你的 Pull Request 並將其合併到主分支。

### 6\. 常用指令 (Other Commands)

- **拉取最新的變更 (Fetch updates)，開始開發前一定要 pull，才能和 github 上的檔案同步**
- 若專案有更新，或是在不同的電腦開發，請確保在開始開發之前先拉取最新的變更：
  - 拉取當前所在分支的變更前，記得先確認當前所在分支
  `git branch
`
  - 拉取當前所在分支的變更 (確認完所在分支後，可以使用git pull拉就好)
  ` git pull
`
  - 拉取主分支的變更
  ` git pull origin main
`
  - 拉取選定的分支的變更
  ` git pull origin <branch-name>
`

- **檢查分支 (Check branch)**
  -- 隨時可以查看目前所在的分支：
  `git branch
`

- **切換分支 (Switch branch)**
  -- 若要切換回主分支或其他分支：
  `git checkout branch-name
`

### 7\. 註釋與文件格式 (Code comments and formatting)

- 請確保程式碼有適當的註釋，便於其他組員理解。
- 使用小駝峰法命名
- 代碼風格請遵守項目中的 ESLint 或 Prettier 規範。
- npm run deploy 部署完成後，可以在 https://dizzydog-rgb.github.io/chill-around-project/ 觀看成果

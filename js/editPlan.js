document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.addJourneyBtn').addEventListener('click', function() {
            // 清除當前按鈕的狀態
            document.querySelectorAll('.toggle-button').forEach(button => {
                button.classList.remove('btnSelected');
            });
        })
    
    document.querySelectorAll('.toggle-button').forEach(button => {
        button.addEventListener('click', function() {
            // 切換當前按鈕的狀態
            button.classList.toggle('btnSelected');
        });
    });
});

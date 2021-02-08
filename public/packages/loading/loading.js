var html_loading = `<div id="loading">
                        <div class="divider" aria-hidden="true"></div>
                        <p class="loading-text" aria-label="Loading">
                            <span class="letter" aria-hidden="true">L</span>
                            <span class="letter" aria-hidden="true">o</span>
                            <span class="letter" aria-hidden="true">a</span>
                            <span class="letter" aria-hidden="true">d</span>
                            <span class="letter" aria-hidden="true">i</span>
                            <span class="letter" aria-hidden="true">n</span>
                            <span class="letter" aria-hidden="true">g</span>
                        </p>
                    </div>`;

//permet de cacher le loading au début lorsque la page est prête
$(document).ready(function(){
    $("#content-loading").addClass("hide");
    setTimeout(function(){
        $("#content-loading").html(html_loading);
    }, 200);
});

function showLoading(){
    $("#content-loading").removeClass("hide");
}

function hideLoading(){
    $("#content-loading").addClass("hide");
}
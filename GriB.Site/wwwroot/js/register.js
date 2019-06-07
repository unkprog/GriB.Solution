(function () {


        function resizePlace() {

            var header = document.getElementById("layout-header");
            var footer = document.getElementById("layout-footer");

            var element = document.getElementById("divImgBg");
            element.style.height = 'calc(100hv - 64px)';


        }

        document.getElementsByTagName("BODY")[0].onresize = resizePlace;
        resizePlace();

})(); // end of jQuery name space

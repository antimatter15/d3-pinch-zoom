function PinchZoom(selection, zoom){
    if(!zoom) throw "zoom must be passed as a second argument";

    var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;
    if(!isMac) return;

    selection
        .on('wheel.zoom', wheeled)
        .on('gesturechange', gestured)
        .on('gesturestart', gesturestart)
        .on('gestureend', gestured);

    function wheeled(){
        var e = d3.event;
        e.preventDefault()
        
        if(e.metaKey || e.ctrlKey){
            // on Chrome, pinch-zoom maps to Ctrl+Scroll
            zoom.scaleBy(selection, Math.pow(0.98, e.deltaY))
        } else {
            // Scroll to pan
            var scale = d3.zoomTransform(selection.node()).k;
            zoom.translateBy(selection, -e.deltaX / scale, -e.deltaY / scale)
        }
    }

    var initialScale = 1;
    function gesturestart(){
        // Safari uses their weird gesturestart/gestureend to zoom trick
        initialScale = d3.zoomTransform(selection.node()).k;
        d3.event.preventDefault()
    }

    function gestured(){
        var e = d3.event;
        zoom.scaleTo(selection, e.scale * initialScale)
        e.preventDefault()
    }
}

if(typeof exports === "object" && exports) {  
    module.exports = PinchZoom;
}
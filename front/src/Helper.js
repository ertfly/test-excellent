let Helper = {
    httpGet(name, defaultValue = '') {
        let url = window.location.href;
        name = name.replace(/[[]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);

        if (!results) return defaultValue;
        if (!results[2]) return defaultValue;
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    },
    isNullEmpty(value) {
        if (typeof (value) == 'undefined') {
            return true;
        }

        if (value === null) {
            return true;
        }

        if (typeof (value) === 'string' && value.toString().trim() === '') {
            return true;
        }

        return false;
    },
    nl2br(str, is_xhtml) {
        if (typeof str === 'undefined' || str === null) {
            return '';
        }
        var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    },
    uploadImage: function (max_width, max_height, callback) {
        let resizeImage = function (img, max_width, max_height) {
            let canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            // calculate the width and height, constraining the proportions
            if (width > height) {
                if (width > max_width) {
                    //height *= max_width / width;
                    height = Math.round(height *= max_width / width);
                    width = max_width;
                }
            } else {
                if (height > max_height) {
                    //width *= max_height / height;
                    width = Math.round(width *= max_height / height);
                    height = max_height;
                }
            }
            // resize the canvas and draw the image data into it
            canvas.width = width;
            canvas.height = height;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            return canvas.toDataURL("image/png", 1); // get the data from canvas as 70% JPG (can be also PNG, etc.)
        }
        let processImage = function (file, max_width, max_height, callback) {
            if (!(/image/i).test(file.type)) {
                if (typeof (callback) == 'function') {
                    callback('Arquivo ' + file.name + ' não é uma imagem.', null)
                }
                return;
            }
            var reader = new FileReader()
            reader.readAsArrayBuffer(file)
            reader.onload = function (event) {
                var blob = new Blob([event.target.result])
                window.URL = window.URL || window.webkitURL
                var blobURL = window.URL.createObjectURL(blob)
                var image = new Image()
                image.src = blobURL
                image.onload = function () {
                    var resized = resizeImage(image, max_width, max_height);
                    if (typeof (callback) == 'function') {
                        callback(false, resized)
                    }
                }
            }
        }
        let file = document.createElement('input')
        file.setAttribute('type', 'file')
        file.setAttribute('accept', '.jpg,.jpeg,.png')
        file.click()
        file.onchange = function (a) {
            if (typeof (a.target.files[0]) != 'object') {
                if (typeof (callback) == 'function') {
                    callback('Tentativa inválida!')
                }
                return
            }
            if (!(a.target.files[0] ?? null)) {
                if (typeof (callback) == 'function') {
                    callback('Objeto do arquivo é inválido!')
                }
                return
            }
            processImage(a.target.files[0], max_width, max_height, callback)
        }
    },
}

export default Helper
 $("body").on("change", ".update_detail_picture input", function ()
    {
        $.blockUI({
            message: "<p>Пожалуйста подождите...</p>",
            css: { backgroundColor: "#f00", color: "#fff" },
            overlayCSS: { backgroundColor: "#000", opacity: 0.1, cursor: "wait" }
        });
        var file = [];
        file_temp = $(this)[0].files[0];
        var elementId = $(this)
            .parents("tr")
            .attr("data-id");
        var image = $(this)
            .parents(".DETAIL_PICTURE")
            .find(".for_image img");

        var formData = new FormData();
        formData.append("image", file_temp);
        formData.append("id", elementId);
        formData.append("type", "detail");

        $.ajax({
            type: "POST",
            processData: false,
            contentType: false,
            url: "/local/ajax/updatePicture.php",
            data: formData
        }).done(function (data)
        {
            var data = $.parseJSON(data);
            // console.log(data);
            if (data.STATUS == "ERROR")
            {
                alert(data.MESSAGE);
            } else
            {
                $(image)
                    .attr({
                        src: data.IMAGE,
                        "data-srcset": data.IMAGE,
                        srcset: data.IMAGE
                    })
                    .parent("a")
                    .attr("href", data.IMAGE_BIG);
            }
            $.unblockUI();
        });
    });

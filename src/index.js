import "./styles.scss";
import $ from "jquery";

$(document).ready(function () {
  var count = 0;
  var items = {};

  function getContainer(self, el) {
    return $(self).closest("li").find(el);
  }

  var render = function () {
    count = ++count;
    items[count] = count;

    setTimeout(function () {
      $("#" + items[count] + "-remove-button").on("click", function () {
        var id = $(this).attr("id").split("-")[0];
        delete items[id];
        var item = $(this).closest("li#item-" + id);

        var label = getContainer(item, "label");
        if ($(label).css("background-image") != "none") {
          var button = getContainer(item, "button");
          $(button).removeClass("btn-danger");
          $(label).find("i").css({ display: "block" });
          $(label).css({ "background-image": "none" });
          $(label).addClass("mu-border");
        } else {
          item.remove();
        }

        if (Object.keys(items).length < 5) {
          if ($("#add-image-button").css("display") == "none") {
            $("#add-image-button").css({ display: "block" });
          }
        }
      });

      $(".image-upload").change(function (e) {
        var reader = new FileReader();
        var label = $(this).closest("li").find("label");
        $(label).find("i").css({ display: "none" });
        $(label).find(".lds-ring").css({ display: "block" });
        var button = getContainer(this, "button");
        reader.onload = function (evt) {
          $(label).find(".lds-ring").css({ display: "none" });
          $(button).addClass("btn-danger");
          $(label).removeClass("mu-border");
          $(label).css({ "background-image": `url(${evt.target.result})` });
        };

        Object.keys(e.target.files).map(function (key) {
          reader.readAsDataURL(e.target.files[key]);
        });
      });
    }, 500);

    return `<li id="item-${items[count]}">
      <div>
        <input id="img-${items[count]}" class="image-upload" type="file">
        <label for="img-${items[count]}" class="mu-label scale-in-center mu-border">
            <i class="icon-image"></i>
					<div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </label>
        <button id="${items[count]}-remove-button" type="button" class="remove-image-button btn-secondary">
          <i class="icon-close"></i>
        </button>
      </div>
    </li>`;
  };

  $("#add-image-button").on("click", function () {
    console.log("add", items);
    if (Object.keys(items).length < 5) {
      $(".multiple-upload").prepend(render);
    }

    if (Object.keys(items).length === 5) {
      $(this).css({ display: "none" });
    }
  });
});

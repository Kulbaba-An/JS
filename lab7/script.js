(function(global){
    
    const ns  = {};
    const homeHTML = "home.html";
    const allCategoriesURL = "categories/data/categories.json";
    const categoriesTitleHtml = "categories/categories-title.html";

    const categoryHtml = "categories/category-item.html";
    const catalogItemsUrl = "categories/data/catalogs/";
    const catalogItemsTitleHtml =  "categories/data/catalogs/catalog-items-title.html";
    

    const catalogItemHtml =  "categories/data/catalogs/catalog-item.html";

    const insertHTML = function(selector, html){
        const targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    }
    const showLoading = function(selector){
        let html= "div class='text-center'>";
        html += "<img src='../images/loader.gif' alt='loading'></div>";
        insertHTML(selector,html);

    }
    const insertProperty = function (string, propName,propValue){
        const propToReplace = "{{" + propName + "}}";
        string = string.replace(new RegExp(propToReplace,"g"),propValue);
        return string;
    }
   




    document.addEventListener("DOMContentLoaded", function(event){
       // showLoading("#main-content");
       console.log("Script loaded");
        $ajaxUtils.sendGetRequest(homeHTML,
             function(responseText){
                document.querySelector("#main-content").innerHTML= responseText;
        },
        false
    );

    } );

    ns.loadCatalogCategories = function(){
       // showLoading('#main-content');
        $ajaxUtils.sendGetRequest(
            allCategoriesURL,
            buildAndShowCategoriesHTML
        );};

    ns.loadCatalogItems = function(categoryShort){
        //showLoading("#main-content")
        $ajaxUtils.sendGetRequest(
            catalogItemsUrl + categoryShort + ".json",
            buildAndShowCatalogItemsHTML
        );
    };


        function buildAndShowCategoriesHTML(categories){
            $ajaxUtils.sendGetRequest(categoriesTitleHtml,
                function(categoriesTitleHtml){
                    $ajaxUtils.sendGetRequest(categoryHtml, function(categoryHtml){
                        const categoriesViewHtml = builCategoriesViewHTML(categories,categoriesTitleHtml,categoryHtml);
                        insertHTML("#main-content", categoriesViewHtml);


                    }, false);
                },false);
        }

        function builCategoriesViewHTML(categories,categoriesTitleHtml, categoryHtml){
           
            let finalHtml = categoriesTitleHtml;
            finalHtml += "<section class='row g-5'>";

            for(let i = 0; i < categories.length;i++){
                let html = categoryHtml;
                const name = "" + categories[i].name;
                 const short_name =  categories[i].short_name;
                 html = insertProperty(html, "name", name);
                 html = insertProperty(html, "short_name",short_name);
                 finalHtml += html;

            }
            finalHtml += "</section>";
            return finalHtml;

        }


        function buildAndShowCatalogItemsHTML(categoryCatalogItems){
            $ajaxUtils.sendGetRequest(
                catalogItemsTitleHtml, 
                function (catalogItemsTitleHtml){
                    $ajaxUtils.sendGetRequest(catalogItemHtml,
                        function(catalogItemHtml){
                            const catalogItemsViewHtml= 
                            buildCatalogItemsViewHTML(categoryCatalogItems, 
                                catalogItemsTitleHtml, catalogItemHtml
                            );

                            insertHTML("#main-content", catalogItemsViewHtml);

                        }, false
                    );

                }, false
            );

        }

        function buildCatalogItemsViewHTML(categoryCatalogItems,
            catalogItemsTitleHtml, catalogItemsHtml
        ){
            catalogItemsTitleHtml = insertProperty(catalogItemsTitleHtml, "name", categoryCatalogItems.category.name);
            catalogItemsTitleHtml=insertProperty(catalogItemsTitleHtml, "notes", categoryCatalogItems.category.notes);

            let finalHtml = catalogItemsTitleHtml;
            finalHtml += "<section class='row'>";

            const catalogItems = categoryCatalogItems.catalog_items;
            const catalogShortName = categoryCatalogItems.category.catalogShortName;
            for(let i = 0; i< catalogItems.length;i++){
                let html = catalogItemsHtml;
                html = insertProperty(html, "short_name", catalogItems[i].short_name);
                html = insertProperty(html, "catalogShortName", catalogShortName);
                
                html = insertItemPrice(html, "price", catalogItems[i].price);
                
                 html = insertProperty(html, "description", catalogItems[i].description);
                  html = insertProperty(html, "name", catalogItems[i].name);

                  finalHtml += html;
                 
            }
            finalHtml += "</section>";
            return finalHtml;

        }
        function insertItemPrice(html, pricePropName, priceValue){
            if(!priceValue){
                return insertProperty(html, pricePropName,"");
            }
            priceValue = "$" + priceValue.toFixed(2);
            html = insertProperty(html, pricePropName, priceValue);
            return html;
        }
        
ns.loadRandomCategory = function () {

    $ajaxUtils.sendGetRequest(allCategoriesURL, function(categories) {
        const randomIndex = Math.floor(Math.random() * categories.length);
        console.log("randomIndex " + randomIndex);
        const randomCategoryShortName = categories[randomIndex].short_name;
         console.log("randomCategoryShortName " + randomCategoryShortName);
        ns.loadCatalogItems(randomCategoryShortName);
    });
};




global.$ns = ns;



})(window);

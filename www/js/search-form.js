$(document).ready(function() {

  // forEach fix for ie11
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  (function ( $ ) {
    $.fn.searchForm = function() {
      return this.each(function() {

        const inputSearch = $(this).find('.input-search');
        const searchApi = $(this).data('api');
        const searchListWrapper = $(this).find('.form-search__list');
      
        const searchList = '<ul class="form-search__ul"></ul>';

        const searchText = {
          empty: {
            main: {
              ua: 'Почніть вводить назву у пошук, наприклад: Київстар, Київводоканал, Ясно',
              ru: 'Начните вводить название в поиск, например: Киевстар, Киевводоканал, Ясно',
              en: 'Correctly enter the name of the search, for example: Kyivstar, Kyivvodokanal, Yasno'
            } 
          },
          nothing: {
            text1: {
              ua: 'Нічого не знайдено',
              ru: 'Ничего не найдено',
              en: 'Nothing found'
            },
            text2: {
              ua: 'Спробуйте ще раз або здійсніть платіж за реквізитами',
              ru: 'Попробуйте еще раз или совершите платеж по реквизитам',
              en: 'Try again or make a payment by details'
            },
            link: {
              ua: 'Переказати за реквізитами',
              ru: 'Перевести по реквизитам',
              en: 'Transfer by details'
            },
          },
          result: {
            title: {
              ua: 'Результати пошуку',
              ru: 'Результаты поиска',
              en: 'Searching results'
            },
            requisites: {
              ua: 'Оплата за реквізитами',
              ru: 'Оплата по реквизитам',
              en: 'Payment by details'
            },
            link: {
              ua: 'Сплатити послугу з банківських реквізитів',
              ru: 'Оплатить услугу по банковским реквизитам',
              en: 'Pay for the service using bank details'
            }
          },
          last: {
            title: {
              ua: 'Нещодавно відкриті',
              ru: 'Недавно открытые',
              en: 'Newly opened'
            },
            link: {
              ua: 'Очистити',
              ru: 'Очистить',
              en: 'Clear'
            }
          },
          hint: {
            title: {
              ua: 'Підказка',
              ru: 'Подсказка',
              en: 'Clue'
            },
            text: {
              ua: 'Авторизовані користувачі можуть зберігати шаблони платежів та не шукати сервіси повторно',
              ru: 'Авторизованые пользователи могут сохранять шаблоны платежей и не искать сервисы повтроно',
              en: 'Authorized users can save payment templates and not look for services again'
            }
          }
        }
      
        const currLang = $(document.documentElement).attr('lang');
        let lang = 'ua';
      
        switch (currLang) {
          case 'ru-RU':
            lang = 'ru';
            break;
          case 'en-US':
            lang = 'en';
            break;
          default:
            lang = 'ua';
            break;
        }
      
        // result list title
        let searchResultTitle = '';
        searchResultTitle += '<div class="form-search__recent">';
        searchResultTitle += '<span>' + searchText['result']['title'][lang] + '</span>';
        searchResultTitle += '</div>';

        // result list title last 5
        let searchLastTitle = '';
        searchLastTitle += '<div class="form-search__recent">';
        searchLastTitle += '<span>' + searchText['last']['title'][lang] + '</span>';
        searchLastTitle += '<a href="#" class="form-search__recent-link">' + searchText['last']['link'][lang] + '</a>';
        searchLastTitle += '</div>';

        // search hint last 5
        let searchLastHint = '';
        searchLastHint += '<div class="form-search__tip">';
        searchLastHint += '<div class="form-search__tip-inner">';
        searchLastHint += '<p class="mb-1 heading-color"><strong>' + searchText['hint']['title'][lang] + '</strong></p>';
        searchLastHint += '<p class="mb-0 heading-color">' + searchText['hint']['text'][lang] + '</p>';
        searchLastHint += '</div>';
        searchLastHint += '</div>';

        // search list empty
        let searchListEmpty = '<div class="form-search__tip">';
        searchListEmpty += '<div class="form-search__tip-inner">';
        searchListEmpty += '<p class="mb-0 text-md-center">' + searchText['empty']['main'][lang] + '</p>';
        searchListEmpty += '</div>';
        searchListEmpty += '</div>';
      
        // loader
        let searchLoader = '';
        searchLoader += '<div class="form-search__loading">';
        searchLoader += '<img src="img/form-search/form-search-loader.gif" alt="Loader">';
        searchLoader += '</div>';
      
        let searchListp2r = '<div class="form-search__p2r">';
        searchListp2r += '<span class="form-search__p2r-img">';
        searchListp2r += '<img src="img/form-search/form-search-p2r.svg" alt="Icon">';
        searchListp2r += '</span>';
        searchListp2r += '<span class="form-search__p2r-text">';
        searchListp2r += '<a href="#" class="form-search__p2r-link"><strong>' + searchText['result']['requisites'][lang] + '</strong></a>';
        searchListp2r += '<span>' + searchText['result']['link'][lang] + '</span>';
        searchListp2r += '</span>';
        searchListp2r += '</div>';
      
        // search nothing
        let searchNothing = '<div class="form-search__nothing">';
        searchNothing += '<span class="form-search__nothing-text">';
        searchNothing += '<span>' + searchText['nothing']['text1'][lang] + '</span>';
        searchNothing += '<span>' + searchText['nothing']['text2'][lang] + '</span>';
        searchNothing += '</span>';
        searchNothing += '<span class="form-search__nothing-btn">';
        searchNothing += '<a href="#" class="btn btn-green">' + searchText['nothing']['link'][lang] + '</a>';
        searchNothing += '</span>';
        searchNothing += '</div>';

        let globalData = {};
        let cookieValue = [];

        // get cookie by name
        function getCookie(name) {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
        }

        if (document.cookie.split(';').filter(function(item) {
          return item.trim().indexOf('lastFiveBills=') == 0
        }).length) {
          // cookieValue = JSON.parse(document.cookie.replace(/(?:(?:^|.*;\s*)lastFiveBills\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
          cookieValue = getCookie('lastFiveBills');
          cookieValue = JSON.parse(cookieValue);
        }

        // search cancel button, hide modal
        inputSearch.closest('.form-group').find('.form-search__cancel').on('click', searchCancel);
        $('#searchModal').on('hidden.bs.modal', searchCancel);

        function searchCancel(e) {
          e.preventDefault();
          $(this).removeClass('active').closest('.form-search').find('.input-search').removeClass('filled').val('').end()
            .find('.form-search__list').html('');
        }

        inputSearch.on('keyup', function() {
          if ($(this).val().length >= 3) {
            $(this).closest('form').find('.form-search__cancel').addClass('active');
          } else {
            $(this).closest('form').find('.form-search__cancel').removeClass('active');
          }
        })

        // render list elements
        function renderList(element, id) {
          const categories = element.category;
          const categoriesText = [];

          for (let category in categories) {
            if (categories.hasOwnProperty(category)) {
              const categoryName = categories[category];
              
              categoriesText.push(categoryName['name'][lang]);
            }
          }

          let searchListEl = '<li class="form-search__item" data-bill-id=' + id + '>';
          searchListEl += '<a href=' + '/' + lang + element['url'] + ' class="form-search__link">';
          searchListEl += '<span class="form-search__item-img">';
          searchListEl += '<img src=' + element['logo'] + ' alt="">';
          searchListEl += '</span>';
          searchListEl += '<span class="form-search__item-text">';
          searchListEl += '<span>' + element['name'][lang] + '</span>';
          searchListEl += '<span>' + categoriesText.join(', ') + '</span>';
          searchListEl += '</span>';
          searchListEl += '</a>';
          searchListEl += '</li>';

          $(searchListWrapper).find('.form-search__ul').append(searchListEl);
        }

        searchListWrapper.on('click', function(e) {
          const billId = $(e.target).closest('.form-search__item').data('bill-id');

          // add cookie
          if (billId) {
            const cookieValueUrl = cookieValue.map(function(el) {
              return el['url'];
            });
  
            if (cookieValueUrl.indexOf(globalData[billId]['url']) === -1) {
              cookieValue.length === 5 ? cookieValue.pop() : '';
  
              cookieValue.unshift(globalData[billId]);
              cookieValue[0]['id'] = billId;
            }

            document.cookie = 'lastFiveBills=' + encodeURIComponent(JSON.stringify(cookieValue)) + '; path=/';
          }

          // delete cookie
          if ($(e.target).hasClass('form-search__recent-link')) {
            e.preventDefault();
            document.cookie = 'lastFiveBills=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            cookieValue = [];
            // searchListWrapper.html('');            
          }
        })
      
        inputSearch.on('focus', function() {
          if (document.cookie.split(';').filter(function(item) {
            cookieValue = [];
            return item.trim().indexOf('lastFiveBills=') == 0
          }).length) {
            cookieValue = getCookie('lastFiveBills');
            cookieValue = JSON.parse(cookieValue);
            // cookieValue = JSON.parse(document.cookie.replace(/(?:(?:^|.*;\s*)lastFiveBills\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
          }

          if (searchListWrapper.is(':empty') && (inputSearch.val().length === 0) && (cookieValue.length === 0)) {
            // focus empty
            searchListWrapper.append(searchListEmpty);
          } else if (cookieValue.length > 0) {

            // render 5 last searches
            searchListWrapper.html('');

            searchListWrapper.append(searchLastTitle);
            searchListWrapper.append(searchList);
            searchListWrapper.append(searchLastHint);

            cookieValue.forEach(function(element) {
              const key = element['id'];

              renderList(element, key);
            })
          }
        })

        $('body').on('click', function(e) {
          if (!$(e.target).hasClass('input-search') && searchListWrapper.children().hasClass('form-search__tip')) {
            // if ($(e.target).hasClass('form-search__recent-link')) {
            //   e.preventDefault();
            //   document.cookie = 'lastFiveBills=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            //   cookieValue = [];   
            // }
            searchListWrapper.html('');
          };
        })
      
        // relatedTarget doesn't work on safari
        // inputSearch.on('blur', function(e) {
          // e.preventDefault();
          // if (searchListWrapper.children().hasClass('form-search__tip') && !$(e.relatedTarget).closest('.form-search__item').data('bill-id')) {
          //   searchListWrapper.html('');
          // }

          // delete cookie
          // if ($(e.relatedTarget).hasClass('form-search__recent-link')) {
          //   document.cookie = 'lastFiveBills=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          //   cookieValue = [];
          //   searchListWrapper.html('');            
          // }          
        // })

        inputSearch.on('keyup', function() {
          const searchValue = inputSearch.val();

          searchListWrapper.html('');
      
          if (inputSearch.val().length > 2) {
            $.ajax({
              method: 'get',
              dataType: 'json',
              // url: "https://pre.ipay.ua/api/v1/bills/search?text=kiev",
              // url: 'https://pre.ipay.ua/api/v1/bills/search?text=' + searchValue,
              url: "search.json",
              // url: "https://pre.ipay.ua/api/v1/bills/search?text=%D0%B6%D0%B5%D0%BA",
              // url: 'https://pre.ipay.ua/api/v1/bills/search?text=' + searchValue,
              // url: searchApi + '?text=' + searchValue,
      
              beforeSend: function() {
                searchListWrapper.append(searchLoader);
              },
      
              success: function(data) {
                const dataSize = Object.keys(data).length;
                globalData = data;

                searchListWrapper.html('');

                if (dataSize > 0) {
                  searchListWrapper.append(searchResultTitle);
                  searchListWrapper.append(searchList);
                  searchListWrapper.append(searchListp2r);

                  for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                      const element = data[key];

                      renderList(element, key);
                    }
                  }
                } else {
                  searchListWrapper.append(searchNothing);
                }
                
              },
      
              error: function() {
                console.log('Something went wrong with request');
              }
            });
          }
      
          if (inputSearch.val().length === 0) {
            searchListWrapper.append(searchListEmpty);
          }
          
        })
        
      })
    }
  }( jQuery ));

  $('#form-search').searchForm();
  $('#searchModal').searchForm();

})
var token = localStorage.getItem("token");
// const getBaseURL = () => {
//     return location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";
// }

const getMenu_list = async () => {
    if (token) {
        try {
            const response = await axios.get(getBaseURL() + 'api/v1/habilitation_menu', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            });
            if (response.status == 200) return response.data;
        } catch (error) {
            console.log(error);
        }
    } else alert(langue == 'fr' ? 'connectez-vous!' : 'get log in');
}


// sélectionner l'élément de menu parent
var span = document.getElementById("span1");
var lib_sous_menu = document.getElementById("lib_sous_menu");

getMenu_list().then(
    response => {
        // menu simple
        var html = ``;
        let active_Parent = false;
       // let active_Child = false;
        let active_sm = false;

        for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].menu_id == 0) {
                // menu parent debut
                const elt = response.data[i];
                let count_ss_mn=0;
                for (let k = 0; k < response.data.length; k++) {
                    if (response.data[k].menu_id == elt.id) {
                        const c = response.data[k];

                        active_Parent = false;
                        if (elt.id == c.menu_id && (window.location.pathname).includes(c.target)) {
                            active_Parent = true;
                            break;
                        }
                        count_ss_mn++;
                    }
                }

                html += `<li id="parent${elt.id} " class="menu-item menu-item-submenu ${(active_Parent ? 'menu-item-open' : '')}" aria-haspopup="true" data-menu-toggle="hover">
                            <a href="javascript:void(0);" style="margin-left: 17px;" class="menu-link menu-toggle">
                                <span class="svg-icon menu-icon">
                                <i class="${elt.icone}"></i>
                                </span>
                                <span class="menu-text">${elt.libelle_fr}</span> ${(count_ss_mn >0 ? '<i class="menu-arrow"></i>' : '')}
                            </a>
                            <div class="menu-submenu" style=" ${(active_Parent ? '' : 'display: none; overflow: hidden;')}" kt-hidden-height="200">
                                <i class="menu-arrow"></i>
                                <ul class="menu-subnav menu menu_child_s">
                                    <li class="menu-item  menu-item-parent" aria-haspopup="true">
                                        <span class="menu-link">
                                            <span class="menu-text">${elt.libelle_fr}</span>
                                        </span>
                                    </li>
                            `;

                for (let j = 0; j < response.data.length; j++) {
                    if (response.data[j].menu_id == elt.id) {
                        const item = response.data[j];

                        // active_sm = false;
                        active_sm = false;
                        if ((window.location.pathname).includes(item.target)) {
                            active_sm = true;
                        }

                        const subSubMenus = response.subSubMenusData.filter(subItem => subItem.menu_id == item.id);
                        const hasSubmenuClass = subSubMenus.length > 0 ? ' has-submenu' : '';

                        // sous-menu debut
                        const submenuLink = subSubMenus.length > 0 ? 'javascript:void(0);' : ('/' + item.target);

                              // ajouter une class menu-item-open
                        html += `
                            <li class="menu-item menu-item-submenu  ${(active_sm ? 'menu-item-open' : '')}   ${hasSubmenuClass}" id="children_ ${item.id}" aria-haspopup="true" data-menu-toggle="hover">
                                <a href=" ${submenuLink} " class="menu-link  ${(subSubMenus.length >0 ? 'menu-toggle' : '')}">
                                    <i class="menu-bullet menu-bullet-line">
                                    <span></span>
                                    </i>
                                    <span class="menu-text"> ${item.libelle_fr} </span>
                                    ${(subSubMenus.length >0 ? '<i class="menu-arrow"></i>' : '')}

                                </a>

                                <div class="menu-submenu " style="" kt-hidden-height="200">
                                       <i class="menu-arrow"></i>

                                    <ul class="menu-subnav">

                        `;
                        // sous sous-menu debut
                        if (subSubMenus.length > 0) {
                            for (let j = 0; j < subSubMenus.length; j++) {

                                html+=`
                                    <li class="menu-item " aria-haspopup="true">
                                        <a href="/${subSubMenus[j].target}" class="menu-link ">
                                            <i class="menu-bullet menu-bullet-dot"><span></span></i>
                                            <span class="menu-text">${subSubMenus[j].libelle_fr}</span>
                                        </a>
                                    </li>
                                `;
                            }

                        }
                        // sous-menu fin
                        html += `
                               </ul>
                            </div>
                        </li>`;
                    }
                }

                    html += `</ul>
                        </div>`;
                // menu enfant fin

                html +=`</li>`;
                // menu parent fin
            }
        }

        $(".menu").append(html);

        // menu paramètre
        let listHtml = '';
        for (let i = 0; i < response.para.length; i++) {
            const item = response.para[i];
            const linkHtml = `<a style="color: black;" href="/${item.target}" class="menu-link">${item.libelle_fr}</a>`;
            const listItemHtml = `<li style="margin:5px;">${linkHtml}</li>`;
            listHtml += listItemHtml;
        }
        $("#menu_para").append(listHtml);

    }
);

'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">KarateDo documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-f36d8ab79cb96e8d2489efc47db5ebc1"' : 'data-target="#xs-components-links-module-AppModule-f36d8ab79cb96e8d2489efc47db5ebc1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-f36d8ab79cb96e8d2489efc47db5ebc1"' :
                                            'id="xs-components-links-module-AppModule-f36d8ab79cb96e8d2489efc47db5ebc1"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ModalCategoriaPageModule.html" data-type="entity-link">ModalCategoriaPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ModalCategoriaPageModule-23ac9555271f914c5faec867d4cc4050"' : 'data-target="#xs-components-links-module-ModalCategoriaPageModule-23ac9555271f914c5faec867d4cc4050"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ModalCategoriaPageModule-23ac9555271f914c5faec867d4cc4050"' :
                                            'id="xs-components-links-module-ModalCategoriaPageModule-23ac9555271f914c5faec867d4cc4050"' }>
                                            <li class="link">
                                                <a href="components/ModalCategoriaPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalCategoriaPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ModalParticipantePageModule.html" data-type="entity-link">ModalParticipantePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ModalParticipantePageModule-9ee2085c8521d97cb96d62bff5b1e3f4"' : 'data-target="#xs-components-links-module-ModalParticipantePageModule-9ee2085c8521d97cb96d62bff5b1e3f4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ModalParticipantePageModule-9ee2085c8521d97cb96d62bff5b1e3f4"' :
                                            'id="xs-components-links-module-ModalParticipantePageModule-9ee2085c8521d97cb96d62bff5b1e3f4"' }>
                                            <li class="link">
                                                <a href="components/ModalParticipantePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalParticipantePage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PuntosParticipantePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PuntosParticipantePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PuntosPageModule.html" data-type="entity-link">PuntosPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PuntosPageModule-60b97a2e92c607f0e5daa08bae109418"' : 'data-target="#xs-components-links-module-PuntosPageModule-60b97a2e92c607f0e5daa08bae109418"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PuntosPageModule-60b97a2e92c607f0e5daa08bae109418"' :
                                            'id="xs-components-links-module-PuntosPageModule-60b97a2e92c607f0e5daa08bae109418"' }>
                                            <li class="link">
                                                <a href="components/PuntosPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PuntosPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PuntosParticipantePageModule.html" data-type="entity-link">PuntosParticipantePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PuntosParticipantePageModule-70c6ea848d8b7f7bff5811e03b17d94a"' : 'data-target="#xs-components-links-module-PuntosParticipantePageModule-70c6ea848d8b7f7bff5811e03b17d94a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PuntosParticipantePageModule-70c6ea848d8b7f7bff5811e03b17d94a"' :
                                            'id="xs-components-links-module-PuntosParticipantePageModule-70c6ea848d8b7f7bff5811e03b17d94a"' }>
                                            <li class="link">
                                                <a href="components/PuntosParticipantePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PuntosParticipantePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Tab1PageModule.html" data-type="entity-link">Tab1PageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-Tab1PageModule-c936e155bb88ebc9544618a9dfb014d0"' : 'data-target="#xs-components-links-module-Tab1PageModule-c936e155bb88ebc9544618a9dfb014d0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Tab1PageModule-c936e155bb88ebc9544618a9dfb014d0"' :
                                            'id="xs-components-links-module-Tab1PageModule-c936e155bb88ebc9544618a9dfb014d0"' }>
                                            <li class="link">
                                                <a href="components/ModalCategoriaPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalCategoriaPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalParticipantePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalParticipantePage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PuntosParticipantePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PuntosParticipantePage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Tab1Page.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">Tab1Page</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Tab2PageModule.html" data-type="entity-link">Tab2PageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-Tab2PageModule-e45ca4b2560fe0975f1f5017cb2b4856"' : 'data-target="#xs-components-links-module-Tab2PageModule-e45ca4b2560fe0975f1f5017cb2b4856"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Tab2PageModule-e45ca4b2560fe0975f1f5017cb2b4856"' :
                                            'id="xs-components-links-module-Tab2PageModule-e45ca4b2560fe0975f1f5017cb2b4856"' }>
                                            <li class="link">
                                                <a href="components/Tab2Page.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">Tab2Page</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Tab3PageModule.html" data-type="entity-link">Tab3PageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-Tab3PageModule-6c7593e6f11050142c7964be43799a3e"' : 'data-target="#xs-components-links-module-Tab3PageModule-6c7593e6f11050142c7964be43799a3e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Tab3PageModule-6c7593e6f11050142c7964be43799a3e"' :
                                            'id="xs-components-links-module-Tab3PageModule-6c7593e6f11050142c7964be43799a3e"' }>
                                            <li class="link">
                                                <a href="components/Tab3Page.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">Tab3Page</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TabsPageModule.html" data-type="entity-link">TabsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TabsPageModule-ad31af86c1dbf39de6e73f429de63f90"' : 'data-target="#xs-components-links-module-TabsPageModule-ad31af86c1dbf39de6e73f429de63f90"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TabsPageModule-ad31af86c1dbf39de6e73f429de63f90"' :
                                            'id="xs-components-links-module-TabsPageModule-ad31af86c1dbf39de6e73f429de63f90"' }>
                                            <li class="link">
                                                <a href="components/TabsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TabsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TabsPageRoutingModule.html" data-type="entity-link">TabsPageRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/NivelGrado.html" data-type="entity-link">NivelGrado</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link">AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ServCategoriaService.html" data-type="entity-link">ServCategoriaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ServiciosService.html" data-type="entity-link">ServiciosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ServPuntosService.html" data-type="entity-link">ServPuntosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThemeSwitcherService.html" data-type="entity-link">ThemeSwitcherService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/iProps.html" data-type="entity-link">iProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Theme.html" data-type="entity-link">Theme</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ThemeStyle.html" data-type="entity-link">ThemeStyle</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
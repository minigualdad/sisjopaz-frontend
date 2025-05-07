import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';
import { NAV_ITEMS, Roles } from '../../shared/constants/constants';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  animations: [
    // Animación para el menú principal
    trigger('slideCollapse', [
      state('open', style({ 
        width: '20rem',
        opacity: 1,
        overflow: 'hidden'
      })),
      state('closed', style({ 
        width: '5rem',
        opacity: 0,
        overflow: 'hidden'
      })),
      transition('open => closed', [
        animate('300ms ease-in', style({ width: '5rem', opacity: 0 }))
      ]),
      transition('closed => open', [
        animate('300ms ease-out', style({ width: '20rem', opacity: 1 }))
      ])
    ]),
    trigger('tagAnimation', [
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(-20px)'
      })),
      transition('visible => hidden', [
        animate('0.5s ease-out')
      ]),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('0.3s ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})

export class LayoutComponent implements OnInit {
  isMenuOpen = false;
  activeSection: string = 'Inicio';
  isMobileMenuOpen = false;
  subMenuOpen = false;
  currentSubMenu: any[] = [];
  currentSubMenuParent = '';
  user: any;
  connectionStatus = false;
  professionalTeam: any;
  isProfessionalTeam: boolean = false;
  navItems: any[] = [];
  userRole: string = '';
  showMenu = true;
  isAnimating = false;

  children : any[] = [];
  showSubMenuParams = false;
  showSubMenuAdmDir = false;
  sectionMenu = '';
  showTooltip: string | null = null;

  dragPosition = {x: 0, y: 0};
  isDragging = false;
  startPosition = {x: 0, y: 0};

  get isMobileView(): boolean {
    return window.innerWidth < 768; // md breakpoint de Tailwind es 768px
  }

  hideTooltipAfterDelay(tooltipName: string) {
    if (this.showTooltip === tooltipName) {
      setTimeout(() => {
        this.showTooltip = null;
      }, 3000); // 3 segundos
    }
  }

  startDrag(event: MouseEvent) {
    this.isDragging = true;
    this.startPosition = {
      x: event.clientX - this.dragPosition.x,
      y: event.clientY - this.dragPosition.y
    };
    event.preventDefault();
  }

  onDrag(event: MouseEvent) {
    if (!this.isDragging) return;
    
    this.dragPosition = {
      x: event.clientX - this.startPosition.x,
      y: event.clientY - this.startPosition.y
    };
  }

  endDrag() {
    this.isDragging = false;
  }

  toggleMenu() {
    this.hiddenMinMenu();
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    this.showMenu = !this.showMenu;
    
    setTimeout(() => {
      this.isAnimating = false;
    }, 100);
  }

  hiddenMinMenu(){
    this.showSubMenuParams = false;
    this.showSubMenuAdmDir = false;
  }

  navigateTo(route:string){
    this.hiddenMinMenu();
    this.router.navigateByUrl(route);
  }

  constructor(private router: Router,
    private userService: UserService
  ) {
  }
  ngOnInit(): void {
    this.initializeNavItems();
    this.detectConnection();
    if(this.connectionStatus){
      this.getUser();
    } else {
      this.userRole = this.userService.getUserRole() || '';
    }

    const section = localStorage.getItem("section")
    if (section) {
      this.activeSection = section;
    }
  }

  async initializeNavItems() {
    this.navItems = await this.getNavItems();
  }

  showOrHiddenMenu(){
    this.showMenu = !this.showMenu;
  }

  async getNavItems() {
    return NAV_ITEMS.filter((item: any) => this.userService.hasPermissionRole(item.role as Roles));
  }

  async getUser() {
    await this.userService.getUser()
      .subscribe(async (response: any) => {
        this.user = response.user;
        this.userRole = this.user.role;
        // this.verifyProfessionalTeam();
      });
  }

  detectConnection(): void {
    if (navigator.onLine) {
      this.connectionStatus = true;
    } else {
      this.connectionStatus = false;
    }
  }

  // Establece la sección activa
  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  // verifyProfessionalTeam() {
  //   const hasRole = this.userService.hasPermissionRole([Roles.DIRECCION, Roles.COORDINACION, Roles.PROFESIONAL_EDUCACION, Roles.PROFESIONAL_CORRESPONSABILIDAD, Roles.PROFESIONAL_PSICOSOCIAL]);
  //   if (hasRole) {
  //     const professionalTeamRoute = {
  //       name: 'Jóvenes',
  //       route: null,
  //       icon: 'svg/beneficiary.svg',
  //       role: 'ADMIN',
  //       children: [
  //         {
  //           name: 'Todos Los Jóvenes',
  //           route: `/app/professional-team-beneficiary`,
  //           icon: 'svg/circle.svg',
  //           role: 'ADMIN'
  //         },
  //         {
  //           name: 'Jóvenes no Validados',
  //           route: '/app/beneficiary-no-validate-professional',
  //           icon: 'svg/circle.svg',
  //           role: 'ADMIN'
  //         },
  //         {
  //           name: 'Jóvenes Aprobados sin Firmar Acuerdo',
  //           route: `/app/professional-team-beneficiary-accepted`,
  //           icon: 'svg/circle.svg',
  //           role: 'ADMIN'
  //         },
  //         {
  //           name: 'Acuerdo firmado sin Certificación Bancaria',
  //           route: `/app/banking-certification-rejected`,
  //           icon: 'svg/circle.svg',
  //           role: 'ADMIN'
  //         },
  //         {
  //           name: 'Beneficiarios Sin Grupo',
  //           route: `/app/beneficiary-without-group`,
  //           icon: 'svg/circle.svg',
  //           role: 'ADMIN'
  //         },
  //         {
  //           name: 'Jóvenes Sin Validar Por ARN',
  //           route: `/app/professional-team-beneficiary-arn-pending`,
  //           icon: 'svg/circle.svg',
  //           role: 'ADMIN'
  //         },
  //         {
  //           name: 'Jóvenes Sin Validar Por DPS',
  //           route: `/app/professional-team-beneficiary-dps-pending`,
  //           icon: 'svg/circle.svg',
  //           role: 'ADMIN'
  //         },
  //         {
  //           name: 'Jóvenes Sin Validar Por DNP',
  //           route: `/app/professional-team-beneficiary-dnp-pending`,
  //           icon: 'svg/circle.svg',
  //           role: 'ADMIN'
  //         },
  //         {
  //           name: 'Jóvenes No Validados por DNP',
  //           route: `/app/professional-team-beneficiary-dnp-rejected`,
  //           icon: 'svg/circle.svg',
  //           role: 'ADMIN'
  //         },
  //         {
  //           name: 'Jóvenes No Validados por ARN',
  //           route: `/app/professional-team-beneficiary-arn-rejected`,
  //           icon: 'svg/circle.svg',
  //           role: 'ADMIN'
  //         },
  //         {
  //           name: 'Jóvenes No Validados por DPS',
  //           route: `/app/beneficiary-rejected-DPS`,
  //           icon: 'svg/circle.svg',
  //           role: 'ADMIN'
  //         },
  //         {
  //           name: 'Grupos',
  //           route: `/app/group`,
  //           icon: 'svg/circle.svg',
  //           role: 'ADMIN'
  //         },
  //       ]
  //     };
  //     this.navItems.splice(6, 0, professionalTeamRoute);
  //   } else {
  //     this.isProfessionalTeam = false;
  //   }
  // }

  addSubMenuItem(name: string, route: string, icon: string) {
    const professionalTeamMenu = this.navItems.find(item => item.name === 'Jóvenes');
    if (professionalTeamMenu && professionalTeamMenu.children) {
      professionalTeamMenu.children.push({ name, route, icon });
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  redirectTo(route: string, name: string, closeAll: boolean) {
    this.activeSection = name;
    if (closeAll) {
      this.navItems.forEach(navItem => {
        if (navItem.children) {
          navItem.isOpen = false;
        }
      });
    }
    this.router.navigateByUrl(route);
    if (this.isMobileView) {
      this.isMenuOpen = false;
    }
  }

  redirectToMinMenu(route: string, name: string, event: MouseEvent) {
    event.stopPropagation(); // Evita que el clic se propague
    
    if (name === 'Parámetros Administrativos') {
      this.sectionMenu = name;
      this.children = [];
      this.showSubMenuParams = !this.showSubMenuParams; // Alternar visibilidad
      this.showSubMenuAdmDir = false; // Cerrar el otro menú si está abierto
      
      const data = this.navItems.find((item: any) => item.name === 'Parámetros Administrativos');
      this.children = data?.children || [];
      
      return;
    }
    
    if (name === 'Administración Dirección') {
      this.sectionMenu = name;
      this.children = [];
      this.showSubMenuAdmDir = !this.showSubMenuAdmDir; // Alternar visibilidad
      this.showSubMenuParams = false; // Cerrar el otro menú si está abierto
      
      const data = this.navItems.find((item: any) => item.name === 'Administración Dirección');
      this.children = data?.children || [];
      
      return;
    }
    
    this.router.navigateByUrl(route);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    // Si lo cierras, colapsa todos los submenús
    if (!this.isMobileMenuOpen) {
      this.navItems.forEach(nav => {
        if (nav.children) {
          nav.isOpenMobile = false;
        }
      });
    }
  }

  toggleSubMenuMobile(item: any) {
    this.navItems.forEach(nav => {
      if (nav.children && nav !== item) {
        nav.isOpenMobile = false;
      }
    });
    item.isOpenMobile = !item.isOpenMobile;
    this.activeSection = item.name;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.navItems.forEach(nav => {
      if (nav.children) {
        nav.isOpenMobile = false;
      }
    });
  }

  openSubMenu(item: any) {
    if (this.subMenuOpen && this.currentSubMenuParent === item.name) {
      this.closeSubMenu();
      return;
    }
    this.currentSubMenu = item.children;
    this.currentSubMenuParent = item.name;
    this.subMenuOpen = true;

    const sidebarEl = document.getElementById('sidebar');
    if (sidebarEl) {
      sidebarEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  closeSubMenu() {
    this.subMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const menu = document.getElementById('mobile-menu');
    if (this.isMenuOpen && menu && !menu.contains(event.target as Node)) {
      this.closeMobileMenu();
    }
  }
}

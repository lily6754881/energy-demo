/**
 * 能碳管理平台 - 导航菜单配置
 * 使用方式：
 * 1. 在页面 </aside> 之前添加: <script src="sidebar-nav.js"></script>
 * 2. 在 body 末尾添加: <script>initSidebarNav();</script>
 */

// 菜单配置
var MENU_CONFIG = [
    { title: '驾驶舱', icon: 'fa-chart-line', page: 'P02-dashboard.html', standalone: true },
    { 
        title: '能源管理', 
        icon: 'fa-bolt', 
        children: [
            { title: '实时监测', icon: 'fa-gauge-high', page: 'P03-monitor.html' },
            { title: '历史曲线', icon: 'fa-chart-area', page: 'P04-history.html' },
            { title: '数据报表', icon: 'fa-file-lines', page: 'P05-report.html' },
            { title: '分项计量', icon: 'fa-list-check', page: 'P06-classification.html' },
            { title: '账单管理', icon: 'fa-file-invoice-dollar', page: 'P07-bill.html' },
            { title: '分摊规则', icon: 'fa-calculator', page: 'P08-allocation.html' },
            { title: '能耗录入', icon: 'fa-pen-to-square', page: 'P09-entry.html' }
        ]
    },
    { 
        title: '碳管理', 
        icon: 'fa-cloud', 
        children: [
            { title: '碳排放核算', icon: 'fa-calculator', page: 'P10-carbon.html' },
            { title: '历史数据', icon: 'fa-clock-rotate-left', page: 'P11-carbon-history.html' },
            { title: '排放报告', icon: 'fa-file-pdf', page: 'P12-carbon-report.html' }
        ]
    },
    { 
        title: '告警中心', 
        icon: 'fa-bell', 
        children: [
            { title: '告警配置', icon: 'fa-gear', page: 'P13-alarm-config.html' },
            { title: '告警记录', icon: 'fa-list', page: 'P14-alarm-list.html' },
            { title: '告警处理', icon: 'fa-hand', page: 'P15-alarm-handle.html' }
        ]
    },
    { 
        title: '运维管理', 
        icon: 'fa-server', 
        children: [
            { title: '设备台账', icon: 'fa-database', page: 'P16-device-account.html' }
        ]
    },
    { 
        title: '报表中心', 
        icon: 'fa-chart-bar', 
        children: [
            { title: '报表模板', icon: 'fa-newspaper', page: 'P17-report-template.html' },
            { title: '自定义报表', icon: 'fa-wand-magic-sparkles', page: 'P18-report-custom.html' }
        ]
    },
    { 
        title: '系统管理', 
        icon: 'fa-gears', 
        children: [
            { title: '租户管理', icon: 'fa-building', page: 'P19-tenant.html' },
            { title: '用户权限', icon: 'fa-users', page: 'P20-user.html' },
            { title: '建筑管理', icon: 'fa-house', page: 'P21-building.html' },
            { title: '设备管理', icon: 'fa-microchip', page: 'P22-device.html' },
            { title: '参数配置', icon: 'fa-sliders', page: 'P23-param.html' }
        ]
    }
];

// 初始化侧边栏导航
function initSidebarNav() {
    var sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    
    var menuContainer = sidebar.querySelector('.sidebar-menu') || document.getElementById('nav-container');
    if (!menuContainer) return;
    
    // 获取当前页面文件名
    var currentPage = window.location.href.split('/').pop() || 'P02-dashboard.html';
    
    // 清空现有菜单
    menuContainer.innerHTML = '';
    
    // 渲染菜单
    MENU_CONFIG.forEach(function(group) {
        if (group.standalone) {
            // 独立菜单项（驾驶舱）
            var item = createMenuItem(group, currentPage);
            menuContainer.appendChild(item);
        } else {
            // 分组菜单
            var menuGroup = createMenuGroup(group, currentPage);
            menuContainer.appendChild(menuGroup);
        }
    });
    
    // 绑定手风琴事件
    bindAccordionEvents();
}

// 创建菜单项
function createMenuItem(item, currentPage) {
    var div = document.createElement('div');
    div.className = 'sidebar-item' + (item.page === currentPage ? ' active' : '');
    div.onclick = function() { location.href = item.page; };
    div.innerHTML = '<i class="fa-solid ' + item.icon + '"></i><span>' + item.title + '</span>';
    return div;
}

// 创建菜单分组
function createMenuGroup(group, currentPage) {
    var groupDiv = document.createElement('div');
    groupDiv.className = 'menu-group';
    
    // 检查当前页面是否属于此分组
    var isActiveGroup = group.children && group.children.some(function(item) {
        return item.page === currentPage;
    });
    // 只有当前页面属于该组时才展开，其他默认折叠
    var shouldOpen = isActiveGroup;
    
    // 分组标题
    var header = document.createElement('div');
    header.className = 'menu-group-header' + (shouldOpen ? ' active' : '');
    header.onclick = function() { toggleMenu(this); };
    header.innerHTML = 
        '<span><i class="fa-solid ' + group.icon + '" style="width:20px;margin-right:10px;"></i>' + group.title + '</span>' +
        '<i class="fa-solid fa-chevron-right menu-arrow' + (shouldOpen ? ' active' : '') + '"></i>';
    groupDiv.appendChild(header);
    
    // 分组内容
    var content = document.createElement('div');
    content.className = 'menu-group-content' + (shouldOpen ? ' open' : '');
    
    if (group.children) {
        group.children.forEach(function(item) {
            var childItem = document.createElement('div');
            childItem.className = 'sidebar-item' + (item.page === currentPage ? ' active' : '');
            childItem.onclick = function() { location.href = item.page; };
            childItem.innerHTML = '<i class="fa-solid ' + item.icon + '"></i><span>' + item.title + '</span>';
            content.appendChild(childItem);
        });
    }
    
    groupDiv.appendChild(content);
    return groupDiv;
}

// 手风琴切换
function toggleMenu(header) {
    var group = header.parentElement;
    var content = group.querySelector('.menu-group-content');
    var isOpen = content.classList.contains('open');
    
    // 关闭所有分组
    document.querySelectorAll('.menu-group-content').forEach(function(c) { 
        c.classList.remove('open'); 
    });
    document.querySelectorAll('.menu-group-header').forEach(function(h) {
        h.classList.remove('active');
        var arrow = h.querySelector('.menu-arrow');
        if (arrow) arrow.classList.remove('active');
    });
    
    // 如果当前是关闭的，则打开它
    if (!isOpen) {
        content.classList.add('open');
        header.classList.add('active');
        var arrow = header.querySelector('.menu-arrow');
        if (arrow) arrow.classList.add('active');
    }
}

// 绑定手风琴事件（由 onclick 在创建元素时完成）
function bindAccordionEvents() {
    // 占位函数
}

// 页面加载时自动初始化
document.addEventListener('DOMContentLoaded', initSidebarNav);

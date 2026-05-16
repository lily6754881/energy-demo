/**
 * 统一侧边栏导航脚本
 * 使用方法: 在页面中添加 <script src="sidebar.js"></script>
 * 然后调用 initSidebar('当前页面文件名') 初始化导航
 */

// 完整导航配置
const NAV_CONFIG = [
    {
        group: '',
        items: [
            { id: 'dashboard', name: '驾驶舱', icon: 'fa-chart-line', path: 'P02-dashboard.html' }
        ]
    },
    {
        group: '能源管理',
        items: [
            { id: 'monitor', name: '实时监测', icon: 'fa-gauge-high', path: 'P03-monitor.html' },
            { id: 'history', name: '历史曲线', icon: 'fa-chart-area', path: 'P04-history.html' },
            { id: 'report', name: '数据报表', icon: 'fa-file-lines', path: 'P05-report.html' },
            { id: 'classification', name: '分项计量', icon: 'fa-list-check', path: 'P06-classification.html' },
            { id: 'bill', name: '账单管理', icon: 'fa-file-invoice-dollar', path: 'P07-bill.html' },
            { id: 'allocation', name: '分摊规则', icon: 'fa-calculator', path: 'P08-allocation.html' },
            { id: 'entry', name: '能耗录入', icon: 'fa-pen-to-square', path: 'P09-entry.html' }
        ]
    },
    {
        group: '碳管理',
        items: [
            { id: 'carbon', name: '碳排放核算', icon: 'fa-cloud', path: 'P10-carbon.html' },
            { id: 'carbon-history', name: '历史数据', icon: 'fa-clock-rotate-left', path: 'P11-carbon-history.html' },
            { id: 'carbon-report', name: '排放报告', icon: 'fa-file-pdf', path: 'P12-carbon-report.html' }
        ]
    },
    {
        group: '告警中心',
        items: [
            { id: 'alarm-config', name: '告警配置', icon: 'fa-bell', path: 'P13-alarm-config.html' },
            { id: 'alarm-list', name: '告警记录', icon: 'fa-list', path: 'P14-alarm-list.html' },
            { id: 'alarm-handle', name: '告警处理', icon: 'fa-hand', path: 'P15-alarm-handle.html' }
        ]
    },
    {
        group: '运维管理',
        items: [
            { id: 'device-account', name: '设备台账', icon: 'fa-database', path: 'P16-device-account.html' }
        ]
    },
    {
        group: '报表中心',
        items: [
            { id: 'report-template', name: '报表模板', icon: 'fa-newspaper', path: 'P17-report-template.html' },
            { id: 'report-custom', name: '自定义报表', icon: 'fa-wand-magic-sparkles', path: 'P18-report-custom.html' }
        ]
    },
    {
        group: '系统管理',
        items: [
            { id: 'tenant', name: '租户管理', icon: 'fa-building', path: 'P19-tenant.html' },
            { id: 'user', name: '用户权限', icon: 'fa-users', path: 'P20-user.html' },
            { id: 'building', name: '建筑管理', icon: 'fa-house', path: 'P21-building.html' },
            { id: 'device', name: '设备管理', icon: 'fa-microchip', path: 'P22-device.html' },
            { id: 'param', name: '参数配置', icon: 'fa-gears', path: 'P23-param.html' }
        ]
    }
];

// 样式配置
const SIDEBAR_STYLE = `
<style>
.sidebar { width: 220px; background: #001529; position: fixed; height: 100vh; overflow-y: auto; z-index: 100; }
.sidebar-logo { height: 64px; display: flex; align-items: center; padding: 0 20px; border-bottom: 1px solid rgba(255,255,255,0.1); }
.sidebar-logo i { font-size: 24px; color: #52C41A; margin-right: 10px; }
.sidebar-logo span { color: white; font-size: 16px; font-weight: 600; }
.sidebar-menu { padding: 12px 0; }
.menu-group-title { padding: 8px 20px; font-size: 12px; color: rgba(255,255,255,0.45); margin-top: 8px; }
.sidebar-item { padding: 12px 20px; color: rgba(255,255,255,0.65); cursor: pointer; display: flex; align-items: center; transition: all 0.3s; }
.sidebar-item:hover { background: rgba(255,255,255,0.08); color: white; }
.sidebar-item.active { background: #1890FF; color: white; }
.sidebar-item i { width: 20px; margin-right: 10px; font-size: 14px; }
.sidebar-item span { font-size: 14px; }
</style>
`;

/**
 * 初始化侧边栏
 * @param {string} currentPage - 当前页面文件名，如 'P03-monitor.html'
 */
function initSidebar(currentPage) {
    // 使用 requestAnimationFrame 确保 DOM 已完成解析
    requestAnimationFrame(function() {
        // 注入样式（只注入一次）
        if (!document.getElementById('sidebar-style')) {
            const styleEl = document.createElement('style');
            styleEl.id = 'sidebar-style';
            styleEl.textContent = `
                .sidebar { width: 220px; background: #001529; position: fixed; height: 100vh; overflow-y: auto; z-index: 100; }
                .sidebar-logo { height: 64px; display: flex; align-items: center; padding: 0 20px; border-bottom: 1px solid rgba(255,255,255,0.1); }
                .sidebar-logo i { font-size: 24px; color: #52C41A; margin-right: 10px; }
                .sidebar-logo span { color: white; font-size: 16px; font-weight: 600; }
                .sidebar-menu { padding: 12px 0; }
                .menu-group-title { padding: 8px 20px; font-size: 12px; color: rgba(255,255,255,0.45); }
                .sidebar-item { padding: 12px 20px; color: rgba(255,255,255,0.65); cursor: pointer; display: flex; align-items: center; transition: all 0.3s; }
                .sidebar-item:hover { background: rgba(255,255,255,0.08); color: white; }
                .sidebar-item.active { background: #1890FF; color: white; }
                .sidebar-item i { width: 20px; margin-right: 10px; font-size: 14px; }
                .sidebar-item span { font-size: 14px; }
            `;
            document.head.appendChild(styleEl);
        }
        
        // 获取侧边栏容器
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;
        
        // 构建导航HTML
        let html = `
            <div class="sidebar-logo">
                <i class="fa-solid fa-leaf"></i>
                <span>能碳管理平台</span>
            </div>
            <div class="sidebar-menu">
        `;
        
        NAV_CONFIG.forEach(group => {
            // 如果有分组标题
            if (group.group) {
                html += `<div class="menu-group-title">${group.group}</div>`;
            }
            
            // 渲染菜单项
            group.items.forEach(item => {
                const isActive = item.path === currentPage;
                const activeClass = isActive ? ' active' : '';
                html += `
                    <div class="sidebar-item${activeClass}" onclick="location.href='${item.path}'">
                        <i class="fa-solid ${item.icon}"></i>
                        <span>${item.name}</span>
                    </div>
                `;
            });
        });
        
        html += '</div>';
        sidebar.innerHTML = html;
    });
}

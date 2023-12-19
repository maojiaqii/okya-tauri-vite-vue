// @ts-nocheck
import type { VNode } from 'vue'
import type { AxiosResponse } from 'axios'

declare interface ResponseObject extends AxiosResponse {
  code: number
  msg: string
  data: any
  img?: string
  uuid?: string
}

declare interface RouteObject {
  path: string,
  component: any,
  name: string,
  meta: {
    requireAuth: boolean,
    query: object,
    title: string,
    titleEn: string,
    breadcrumb: string,
    breadcrumbEn: string,
    tabClosable: boolean,
    iframe: number,
    icon: string,
  }
}

declare interface TableDataObject {
  data: Array,
  pageNum: number,
  count: number,
}

declare interface TableColumnObject {
  prop: string,
  label: string,
  comment?: string,
  visible?: boolean,
  width?: number | string,
  minWidth?: number | string,
  sortable?: boolean,
  fixed?: boolean | string,
  align?: string,
  component?: object,
  formatter?: (
    row: T,
    column: TableColumnCtx<T>,
    cellValue,
    index: number
  ) => VNode | string
}

declare interface ValabelObject {
  value: string | number | boolean
  label: string
  children?: Array<ValabelObject>
}

declare interface DictObject {
  dictCode: string
  selectedId?: string | number
  selectedIds?: Array<string | number>
  filterValue?: string
  pageNum?: number
  pageSize?: number
}

declare interface LoginUser {
  userCode: string
  id: string
  /**
   * 登录时间
   */
  loginTime: string
  /**
   * 过期时间
   */
  expireTime: string
  /**
   * 登录IP地址
   */
  ip: string
  /**
   * 登录地点
   */
  loginLocation: string
  /**
   * 浏览器类型
   */
  browser: string
  /**
   * 操作系统
   */
  os: string
  /**
   * 菜单列表
   */
  menus: Array<Menu>
  /**
   * 权限列表
   */
  perms: Array<string>
  /**
   * 用户信息
   */
  asUser: User
  /**
   * 部门信息
   */
  asDept: Dept
}

declare interface Menu {
  /**
   * 菜单ID
   */
  menuId: number
  /**
   * 菜单名称
   */
  menuName: string
  /**
   * 菜单名称
   */
  menuNameEn: string
  /**
   * 父菜单ID
   */
  parentId: number
  /**
   * 显示顺序
   */
  orderNum: number
  /**
   * 组件路径
   */
  component: string
  /**
   * 路由
   */
  path: string
  /**
   * 路由参数
   */
  query: object
  /**
   * 是否为外链（0是 1否）
   */
  isFrame: number
  /**
   * 菜单类型（C目录 M菜单 B按钮）
   */
  menuType: string
  /**
   * 菜单状态（0正常 1停用 2删除）
   */
  status: string
  /**
   * 权限标识
   */
  perms: string
  /**
   * 菜单图标
   */
  icon: string
  /**
   * 创建者
   */
  createBy: string
  /**
   * 创建时间
   */
  createTime: string
  /**
   * 更新者
   */
  updateBy: string
  /**
   * 更新时间
   */
  updateTime: string
  /**
   * 备注
   */
  remark: string

  breadcrumb: string

  breadcrumbEn: string

  children: Array<Menu>
}

declare interface User {
  /**
   * 用户ID
   */
  userId: number
  /**
   * 用户代码
   */
  userCode: string
  /**
   * 部门ID
   */
  deptId: number
  /**
   * 用户账号
   */
  userName: string
  /**
   * 用户类型（00系统用户）
   */
  userType: string
  /**
   * 用户邮箱
   */
  email: string
  /**
   * 手机号码
   */
  phoneNumber: string
  /**
   * 用户性别（0女 1男 2未知）
   */
  sex: number
  /**
   * 头像地址
   */
  avatar: string
  /**
   * 密码
   */
  password: string
  /**
   * 帐号状态（0正常 1停用 2代表删除）
   */
  status: number
  remark: string
}

declare interface Dept {
  /**
   * 部门id
   */
  deptId: number
  /**
   * 部门code
   */
  deptCode: string
  /**
   * 父部门id
   */
  parentId: number
  /**
   * 部门名称
   */
  deptName: string
  /**
   * 显示顺序
   */
  orderNum: number
  /**
   * 负责人
   */
  leader: string
  /**
   * 联系电话
   */
  phone: string
  /**
   * 邮箱
   */
  email: string
  /**
   * 部门状态（0正常 1停用 2删除）
   */
  status: number
}

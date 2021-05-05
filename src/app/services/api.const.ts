export const enum ApiUrl {

    HOST = 'http://iot-solar.nichietsuvn.com/AppService/api',
    //HOST = 'http://localhost:3000/api',
    LOGIN = '/NIC00001/login',
    NEWACCOUNT = '/NIC00001/createacc',
    CHANGEPW = '/NIC00001/changepsw',
    LIST_DEVICE_USER = '/NIC00001/listDeviceUser',
    LIST_DEVICE ='/NIC00001/listDevice',
    INFO_DEVICE ='/NIC00001/infoDevice',
    ONFULL = '/NIC00002/onfull',
    ONDAY = '/NIC00002/onday',
    ADDdEVICE = '/NIC00001/creatdevice',
    UPDATEdEVICE = '/NIC00001/updatedevice',
    STATUSDEVICE = '/NIC00002/statusdevice',
    ENERGY_MANAGEMENT_DAY = '/NIC00002/ondayenergy',
    ENERGY_MANAGEMENT_MONTH = '/NIC00002/onmonthenergy',
    ENERGY_MANAGEMENT_YEAR = '/NIC00002/onyearenergy',
    ENERGY_MANAGEMENT_ALL = '/NIC00002/onallenergy',
    ENERGY_REVENUE_DAY = '/NIC00002/ondayinout',
    ENERGY_REVENUE_MONTH = '/NIC00002/onmonthinout',
    ENERGY_REVENUE_YEAR = '/NIC00002/onyearinout',
    ENERGY_REVENUE_ALL = '/NIC00002/onallinout',
    LIST_ACCOUNT = '/NIC00001/listAcount',
    LIST_ACCOUNT_DEVICE = '/NIC00001/getaccoutofdevice',
    MAP_USER_DEVICE = '/NIC00001/creatdeviceuser'
}
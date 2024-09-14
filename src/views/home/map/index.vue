<template>
    <div id="map_box"></div>
    <el-button @click=nextPoint>下一个点</el-button>
</template>

<script setup>
import { onMounted } from "vue";

let map = null;

let carRealTimeRoute = null;
onMounted(() => {
    initializeMap();
    carRealTimeRoute = new CarRealTimeRoute(map, {
        position: {
            "lng": 116.40570677823,
            "lat": 39.909578080689
        },
        planRoute: [
            {
                "lng": 116.40483542189,
                "lat": 39.911833360861
            },
            {
                "lng": 116.40473660828,
                "lat": 39.91181260709
            },
            {
                "lng": 116.40474559134,
                "lat": 39.911646576696
            },
            {
                "lng": 116.40479948967,
                "lat": 39.910982451061
            },
            {
                "lng": 116.40487135411,
                "lat": 39.910200711529
            },
            {
                "lng": 116.40559898157,
                "lat": 39.910242220049
            },
            {
                "lng": 116.40563491379,
                "lat": 39.910235301964
            },
            {
                "lng": 116.40570677823,
                "lat": 39.909578080689
            },
            {
                "lng": 116.40571576129,
                "lat": 39.909335944933
            },
            {
                "lng": 116.40582355795,
                "lat": 39.907758582322
            },
            {
                "lng": 116.40582355795,
                "lat": 39.907640970485
            },
            {
                "lng": 116.40582355795,
                "lat": 39.907592542023
            },
            {
                "lng": 116.40579660879,
                "lat": 39.907516440083
            },
            {
                "lng": 116.40574271046,
                "lat": 39.907274296982
            },
            {
                "lng": 116.40574271046,
                "lat": 39.906810763496
            },
            {
                "lng": 116.40567982907,
                "lat": 39.906796926627
            },
            {
                "lng": 116.40550915102,
                "lat": 39.906762334442
            },
            {
                "lng": 116.40551813408,
                "lat": 39.906762334442
            },
            {
                "lng": 116.40552711713,
                "lat": 39.906762334442
            },
            {
                "lng": 116.40546423575,
                "lat": 39.906755416003
            },
            {
                "lng": 116.40546423575,
                "lat": 39.906755416003
            },
            {
                "lng": 116.40540135436,
                "lat": 39.906762334442
            },
            {
                "lng": 116.40540135436,
                "lat": 39.906762334442
            },
            {
                "lng": 116.40488932022,
                "lat": 39.906755416003
            },
            {
                "lng": 116.40488033717,
                "lat": 39.906547862502
            },
            {
                "lng": 116.40427847247,
                "lat": 39.906534025579
            },
            {
                "lng": 116.40426948942,
                "lat": 39.906520188654
            },
            {
                "lng": 116.40426948942,
                "lat": 39.906534025579
            }
        ]
    })
    const movedPoints = [
        {
            "lng": 116.40483542189,
            "lat": 39.911833360861
        },
        {
            "lng": 116.40473660828,
            "lat": 39.91181260709
        },
        {
            "lng": 116.40474559134,
            "lat": 39.911646576696
        },
        {
            "lng": 116.40479948967,
            "lat": 39.910982451061
        },
        {
            "lng": 116.40487135411,
            "lat": 39.910200711529
        },
        {
            "lng": 116.40559898157,
            "lat": 39.910242220049
        },
        {
            "lng": 116.40563491379,
            "lat": 39.910235301964
        },
        {
            "lng": 116.40570677823,
            "lat": 39.909578080689
        },
    ]
    carRealTimeRoute.drawMovedLine(movedPoints)
});
const initializeMap = () => {
    map = new BMapGL.Map("map_box");
    map.centerAndZoom(new BMapGL.Point(116.40483542189, 39.911833360861), 18);
    map.enableScrollWheelZoom(true);
};

let pointIndex = 8

const nextPoint = () => {
    carRealTimeRoute.toNextPoint(carRealTimeRoute.planRoute[pointIndex])
    pointIndex++
}

class CarRealTimeRoute {
    // 地图实例
    map = null;
    // 路径点集合
    path = [];
    // 名字
    id = "";
    // 起始位置
    position = null
    // 计划路径
    planRoute = [];
    // 地图计划线路
    planPolyline = null;
    // 车辆的标记
    carMarker = null;
    // 正在移动中
    moveIng = false;
    // 移动到目标点的步数
    currentStep = 0;
    // 把点的移动分为多少步
    totalSteps = 60;
    // 两点的实际距离
    twoPointDistance = 0;
    // 车辆的方向
    twoPointAngle = 0;
    // 上一个位置的点
    oldPoint = null;
    // 车辆行驶过的实时路径
    realPathPolyline = null;
    // 实时路径的点
    linePoints = [];
    // 还没来得及移动的点
    needMovePoint = [];
    constructor(map, { position, planRoute }) {
        this.position = position || planRoute[0];
        if (!map) {
            throw new Error("请传入地图实例");
        }
        this.map = map;
        this.planRoute = planRoute;
        this.drawRoutes();
        this.drawCarMarker();
    }
    // 绘制预设路径
    drawRoutes() {
        // 仅绘制固定的线路
        this.planPolyline = new BMapGL.Polyline(this.planRoute, {
            strokeColor: "blue",
            strokeWeight: 5,
            strokeOpacity: 0.5,
        });
        map.addOverlay(this.planPolyline);
    }
    // 绘制车辆图标
    drawCarMarker() {
        this.carMarker = new BMapGL.Marker(this.position,
            {
                // icon: new BMapGL.Icon(iconUrl, new BMapGL.Size(12, 12))
            }
        );
        this.map.addOverlay(this.carMarker);
        this.path.push(this.position);
    }
    // 移动到下一个点位
    toNextPoint(newPoint) {
        // 取出上一个点位
        this.oldPoint = this.path[this.path.length - 1];
        // 如果还在移动中有下一个点位进入，则先加入待移动队列
        if (this.moveIng) {
            this.needMovePoint.push(newPoint);
            return
        }
        // 计算两点之间的角度
        this.twoPointAngle = this.getTwoPointAngle(this.oldPoint, newPoint)
        this.carMarker.setRotation(this.twoPointAngle)
        // 开始移动
        this.moveVehicle(newPoint);
    }
    // 计算两点之间的距离
    getTwoPointDistance(p1, p2) {
        this.map.getDistance(p1, p2);
    }
    // 计算角度
    getTwoPointAngle(p1, p2) {
        let angle = Math.atan2(Math.abs(p1.lng - p2.lng), Math.abs(p1.lat - p2.lat));
        if (p2.lng >= p1.lng) {
            if (p2.lat >= p1.lat) {
            } else {
                angle = Math.PI - angle;
            }
        } else {
            if (p2.lat >= p1.lat) {
                angle = 2 * Math.PI - angle;
            } else {
                angle = Math.PI + angle;
            }
        }
        angle = angle * 180 / Math.PI;
        return angle;
    }
   
    // 移动车辆
    moveVehicle(newPoint) {
        this.moveIng = true;
        const start = this.oldPoint;
        const end = newPoint;
        // 计算差值位置
        const deltaX = (end.lng - start.lng) / this.totalSteps;
        const deltaY = (end.lat - start.lat) / this.totalSteps;
        const newLng = start.lng + deltaX * this.currentStep;
        const newLat = start.lat + deltaY * this.currentStep;
        const newPos = new BMapGL.Point(newLng, newLat);
        this.carMarker.setPosition(newPos);
        this.map.setCenter(newPos);
        this.linePoints.push(newPos);
        // 移动完以后更新移动轨迹
        this.drawRealTimeRoutes();
        if (this.linePoints.length > 1 && this.currentStep < this.totalSteps) {
            this.linePoints.pop();
        }
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            requestAnimationFrame(this.moveVehicle.bind(this, newPoint));
        } else {
            this.moveIng = false;
            this.currentStep = 0;
            this.path.push(newPoint);
            // 如果有待移动点位则继续移动
            if (this.needMovePoint.length) {
                this.toNextPoint(this.needMovePoint.shift());
            }
        }
    }
    // 绘制实时路径
    drawRealTimeRoutes() {
        if (!this.realPathPolyline) {
            this.realPathPolyline = new BMapGL.Polyline(this.linePoints, {
                strokeColor: "red",
                strokeWeight: 5,
                strokeOpacity: 0.5,
            });
            map.addOverlay(this.realPathPolyline);
        } else {
            this.realPathPolyline.setPath(this.linePoints);
        }
    }
    drawMovedLine(points) {
        this.linePoints = points;
        this.drawRealTimeRoutes()
    }
}
</script>

<style lang="scss" scoped>
#map_box {
    height: 85vh;
    background-color: #ffffff;
}
</style>

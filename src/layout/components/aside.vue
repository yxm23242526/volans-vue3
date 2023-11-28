<script setup>
import { reactive } from "vue";
import router from "@/router";
import { RouterLink } from "vue-router";
const routers = reactive(router.options.routes);
console.log(routers)
function resolveIndex(index, childindex) {
  return index + "-" + childindex;
}

</script>


<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :unique-opened="false" mode="vertical">
        <template v-for="(item, index) in routers">
          <template v-if="!item.hide">
            <template v-if="item.children === undefined || item.children.length === 1">
              <el-menu-item index="index" class="nest-menu">
                <RouterLink :to="item.path">
                  <el-icon>
                    <component :is="item.meta.icon"/>
                  </el-icon>
                  {{ item.meta.name }}
                </RouterLink>
              </el-menu-item>
            </template>

            <template v-else>
              <el-sub-menu :index="index">
                <template #title>
                  <el-icon>
                    <component :is="item.meta.icon"/>
                  </el-icon>
                  {{ item.meta.name }}
                </template>
                <el-menu-item-group>
                  <el-menu-item v-for="(childitem, childindex) in item.children" :index="resolveIndex(index, childindex)"
                                class="nest-menu">

                    <RouterLink :to="childitem.path">
                      <span slot='title'>
                        <el-icon>
                          <component :is="childitem.meta.icon"/>
                        </el-icon>
                        {{ childitem.meta.name }}
                      </span>

                    </RouterLink>
                  </el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
            </template>
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>


<style></style>
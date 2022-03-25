<template>
  <div class="hy-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="center">
          <slot name="center"></slot>
        </div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :row-class-name="tableConfig"
      :data="listData"
      border
      @selection-change="selectionChange"
      v-bind="childrenProps"
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
      <slot></slot>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.current"
          :page-size="page.size"
          :total="totalCount"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '表格数据'
    },
    showIndexColumn: {
      type: Boolean,
      default: true
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    listData: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    propList: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    totalCount: {
      type: Number,
      default: 0
    },
    page: {
      type: Object,
      default: () => ({
        current: 0,
        size: 10
      })
    },
    tableConfig: {
      type: Function,
      default: () => {
        return () => ({})
      }
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    const selectionChange = (value: any) => {
      if (props.showSelectColumn) {
        emit('selectionChange', value)
      }
    }

    const handleCurrentChange = (current: number) => {
      emit('update:page', { ...props.page, current })
    }
    const handleSizeChange = (size: number) => {
      emit('update:page', { ...props.page, size })
    }

    return {
      selectionChange,
      handleCurrentChange,
      handleSizeChange
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>

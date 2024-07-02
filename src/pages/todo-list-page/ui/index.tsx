import { Result, Row, Space, Spin } from "antd"
import { TaskRow, taskModel } from "../../../entities/task"
import { JSX } from "react/jsx-runtime"
import { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ToggleTask } from "../../../features/toggle-task"
import { TaskFilter } from "../../../features/task-filter"

export const TodoListPage = observer(() => {

    const { store: { getTaskList, isLoading, taskListError, taskList } } = taskModel

    useEffect(() => {
        getTaskList({})
    }, [])


    if (taskListError) {
        return <Result title={taskListError} />
    }
    return <Space direction="vertical">
        <TaskFilter onChange={getTaskList} />

        {isLoading ?
            (<Spin />)
            :
            (
                taskList.map((el: any) => <TaskRow key={el.id} {...el} action={<ToggleTask todo={el} />} />)
            )}
    </Space>
})
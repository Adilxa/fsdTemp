import { Result, Row, Spin } from "antd"
import { TaskCard, taskModel } from "../../../entities/task"
import { observer } from "mobx-react-lite"
import { ToggleTask } from "../../../features/toggle-task"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

export const TodoDetailsPage = observer(() => {

    const { store: { getTask, isLoading, taskError, task } } = taskModel

    const { id } = useParams()

    useEffect(() => {
        if (id) {
            getTask(id)
        }
    }, [id])

    return <Row justify="center" align="middle">
        {
            taskError ? <Result title={taskError} /> : <TaskCard title={`Task#${task?.id}`} text={task?.title || ""} loading={isLoading} actions={task ? [<ToggleTask todo={task} />] : undefined} />
        }
    </Row>
})
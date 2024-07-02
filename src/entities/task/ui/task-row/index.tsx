import { Card, Checkbox, Space } from "antd"
import { Link } from "react-router-dom"
import { ToggleTask } from "../../../../features/toggle-task";
import { ReactNode } from "react";

type Props = {
    title: string;
    id: string | number;
    action: ReactNode
}

export const TaskRow = ({ title, id, action }: Props) => {

    return (
        <Card style={{ width: "600px" }}>
            <Space>
                {action}
            </Space>
            <Link to={`/${id}`}>{title}</Link>
        </Card>
    )
}
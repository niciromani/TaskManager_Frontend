import {MyTag} from "./MyTag";

export interface MyTask{
  id: number;
  title: string;
  description: string;
  isFinished: boolean;
  createdDate: string;
  beginDate: string;
  endDate: string;
  priority: string;
  tags: MyTag[] | string[];
}



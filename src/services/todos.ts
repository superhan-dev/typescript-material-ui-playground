import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Todo } from "../types"


const baseUrl = "http://localhost:4000/"

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  // ceaching을 하기위해 정의해야하는 tagTypes
  // ceached data의 label
  tagTypes: ['Todos'],
  endpoints: (build) => ({
    getTodos: build.query<Todo[], void>({
      query: () => 'todos',
      // query에 의해 어떤 데이터를 return할 것인지 결정한다.
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: "Todos" as const, id })),
            { type: 'Todos', id: 'LIST' }
          ]
          : [{ type: 'Todos', id: 'LIST' }]
    }),
    addTodo: build.mutation<Todo, Omit<Todo, 'id'>>({
      query: (body) => ({
        url: 'todos',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Todos']
    }),
    deleteTodo: build.mutation<{ success: boolean, id: string }, string>({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }]
    })
  })
})

export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation } = todosApi;

/**
 * createApi는 RTK Query의 핵심적인 역할을 한다.
 * API에 대한 data를 검색 명세서를 작성할 수 있는 endpoints룰 설정할 수 있도록 도와준다.
 * 이를 포함햐여 data를 변형할 수 있도록 도와주며,
 * 리덕스 로직을 포함한 data fetch의 캡슐화와 함께 API slice 구조를 생성할 수 있도록 도와준다.
 *
 * [parameters]
 * baseQuery: fetchBaseQuery를 사용하여 query의 기본 url을 차리해준다.
 * endpoints: query와 mutation 두가지 형태의 typw을 가지고 있다.
 * tagTypes: 처리결과를 캐싱하거나 무효화 시키기 위해 설정해주면 좋다. 테그타입을 정의할때는 provides와 invalidates를 제공받을 수 있다.
 * reducerPath: reducer에 등록한 store경로
 * keepUnusedDataFor: data를 캐시할 시간을 정한다. 기본은 60초
 * refetchOnSomething: data를 refetch 할 타이밍을 정하여 정해진 타이밍이 refetch할 수 있다.
 * https://redux-toolkit.js.org/rtk-query/api/createApi
 */
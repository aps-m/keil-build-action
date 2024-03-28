# keil-build-action

Действие позволяет собрать проект Keil uVision

## Параметры

### Вход

| Параметр     | Описание                | Тип    | Обязательный | Значение по умолчанию |
| ------------ | ----------------------- | ------ | ------------ | --------------------- |
| project_name | Файл проекта для сборки | Строка | Да           | -                     |
| target_name  | Конфигурация сборки     | Строка | Да           | -                     |

## Пример использования

```
- name: Build project
  uses: aps-m/keil-build-action@v1
  with:
    project_name: 'MDK-ARM/Project.uvprojx'
    target_name: 'Debug'
```

---
titulo: Un pedido sin alcance toca más archivos de los esperados
fecha: 2026-11-09
autor: equipo de la capacitación
estado: vigente
alcance: cualquier cambio pedido a Kiro en este repositorio
revisar_en: 2027-02-09
---

## Contexto

Al pedir cambios a Kiro con una frase general, como «mejora la validación de libros», el
resultado cambió más archivos y tomó decisiones que nadie había pedido.

## Qué pasó

El pedido no decía qué archivo, qué comportamiento ni cómo comprobarlo. Kiro eligió por su cuenta
qué significaba «mejorar». El cambio fue difícil de revisar porque mezclaba varias decisiones.

## Regla propuesta

Cada pedido de cambio indica tres cosas: el alcance (archivo y comportamiento), el criterio de éxito
y la prueba que lo comprueba.

## Cómo verificarla

Después del cambio, `git diff --stat` muestra solo los archivos del alcance y `make test` pasa
con una prueba nueva que cubre el criterio.

## Fuente

Ejercicio 2 de la capacitación: <https://workshop.protecso.io/kiro/nivel-1/04-cambio-pequeno/>

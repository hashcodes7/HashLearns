# Multiple Neurons — Vector and Matrix Form

Suppose we have **2 neurons** and **3 inputs**.
Each neuron receives the same inputs, but has its own weights and bias.

| Neuron 1                                          | Neuron 2                                          |
| ------------------------------------------------- | ------------------------------------------------- |
| $$\boxed{y_1=w_{11}x_1+w_{12}x_2+w_{13}x_3+b_1}$$ | $$\boxed{y_2=w_{21}x_1+w_{22}x_2+w_{23}x_3+b_2}$$ |
## Vector Form

Put the two outputs together:

$$
\boxed{
\begin{bmatrix}
y_1\\
y_2
\end{bmatrix}
=
\begin{bmatrix}
w_{11}x_1+w_{12}x_2+w_{13}x_3+b_1\\
w_{21}x_1+w_{22}x_2+w_{23}x_3+b_2
\end{bmatrix}}
$$

---

## Matrix Form

Collect all the weights into a matrix:

$$
W=
\begin{bmatrix}
w_{11}&w_{12}&w_{13}\\
w_{21}&w_{22}&w_{23}
\end{bmatrix}
$$

Inputs:

$$
x=
\begin{bmatrix}
x_1\\
x_2\\
x_3
\end{bmatrix}
$$

Biases:

$$
b=
\begin{bmatrix}
b_1\\
b_2
\end{bmatrix}
$$

Expanded:

$$
\boxed{
\begin{bmatrix}
y_1\\
y_2
\end{bmatrix}
=
\begin{bmatrix}
w_{11}&w_{12}&w_{13}\\
w_{21}&w_{22}&w_{23}
\end{bmatrix}
\begin{bmatrix}
x_1\\
x_2\\
x_3
\end{bmatrix}
+
\begin{bmatrix}
b_1\\
b_2
\end{bmatrix}}
$$

---
## Example
Suppose we have **2 neurons** and **3 inputs**.

### Inputs and Parameters

|          | weight 1 | weight 2 | weight 3 | bias |
| -------- | -------- | -------- | -------- | ---- |
| Neuron 1 | 1        | 2        | 3        | 1    |
| Neuron 2 | 2        | 1        | 2        | 2    |

| input | x1  | x2  | x3  |
| ----- | --- | --- | --- |
| value | 2   | 3   | 4   |

## Expanded Form

### Neuron 1
| Neuron | Neuron 1                                  |                                           |
| ------ | ----------------------------------------- | ----------------------------------------- |
| 1      | $$y_1=w_{11}x_1+w_{12}x_2+w_{13}x_3+b_1$$ | $$y_2=w_{21}x_1+w_{22}x_2+w_{23}x_3+b_2$$ |
| 2      | $$y_1=(1)(2)+(2)(3)+(3)(4)+1$$            | $$y_2=(2)(2)+(1)(3)+(2)(4)+2 $$           |
| 3      | $$\boxed{y_1=21}$$                        | $$\boxed{y_2=17}$$                        |
Therefore:

$$  
\boxed{  
y=  
\begin{bmatrix}  
21 \ and \  
17  
\end{bmatrix}}  
$$

---


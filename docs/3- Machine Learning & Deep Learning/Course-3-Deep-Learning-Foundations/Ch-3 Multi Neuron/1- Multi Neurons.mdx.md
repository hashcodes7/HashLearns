# Multiple Neurons — Vector and Matrix Form

Suppose we have **2 neurons** and **3 inputs**.

## Individual Equations

Each neuron receives the same inputs, but has its own weights and bias.

### Neuron 1

$$
\boxed{y_1=w_{11}x_1+w_{12}x_2+w_{13}x_3+b_1}
$$

### Neuron 2

$$
\boxed{y_2=w_{21}x_1+w_{22}x_2+w_{23}x_3+b_2}
$$

---

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


![531](assets/ChatGPT%20Image%20Sep%2011,%202026,%2007_03_10%20PM%201.png)

## Example
Suppose we have **2 neurons** and **3 inputs**.

### Inputs

$$  
x_1=2,\quad x_2=3,\quad x_3=4  
$$

### Weights and Biases

Neuron 1:

$$  
w_{11}=1,\quad w_{12}=2,\quad w_{13}=3,\quad b_1=1  
$$

Neuron 2:

$$  
w_{21}=2,\quad w_{22}=1,\quad w_{23}=2,\quad b_2=2  
$$

---

## Expanded Form

### Neuron 1

$$  
y_1=w_{11}x_1+w_{12}x_2+w_{13}x_3+b_1  
$$

Substitute the values:

$$  
y_1=(1)(2)+(2)(3)+(3)(4)+1  
$$

$$  
\boxed{y_1=21}  
$$

### Neuron 2

$$  
y_2=w_{21}x_1+w_{22}x_2+w_{23}x_3+b_2  
$$

Substitute the values:

$$  
y_2=(2)(2)+(1)(3)+(2)(4)+2  
$$

$$  
\boxed{y_2=17}  
$$

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

## Matrix Form

Put all weights into one matrix:

$$  
W=  
\begin{bmatrix}  
1&2&3\\  
2&1&2  
\end{bmatrix}  
$$

Inputs:

$$  
x=  
\begin{bmatrix}  
2\  
3\  
4  
\end{bmatrix}  
$$

Biases:

$$  
b=  
\begin{bmatrix}  
1\  
2  
\end{bmatrix}  
$$

Now use the contracted form:

$$  
\boxed{y=Wx+b}  
$$

Substitute:

$$  
y=  
\begin{bmatrix}  
1&2&3\\  
2&1&2  
\end{bmatrix}  
\begin{bmatrix}  
2\\  
3\\  
4  
\end{bmatrix}  
+  
\begin{bmatrix}  
1\\  
2  
\end{bmatrix}  
$$

Matrix multiplication gives:

$$  
y=  
\begin{bmatrix}  
(1)(2)+(2)(3)+(3)(4)\  
(2)(2)+(1)(3)+(2)(4)  
\end{bmatrix}  
+  
\begin{bmatrix}  
1\  
2  
\end{bmatrix}  
$$

$$  
y=  
\begin{bmatrix}  
20\  
15  
\end{bmatrix}  
+  
\begin{bmatrix}  
1\  
2  
\end{bmatrix}  
$$

Therefore:

$$  
\boxed{  
y=  
\begin{bmatrix}  
21\  
17  
\end{bmatrix}}  
$$

---

## The Important Connection

Expanded:

$$  
\begin{aligned}  
y_1&=w_{11}x_1+w_{12}x_2+w_{13}x_3+b_1\\  
y_2&=w_{21}x_1+w_{22}x_2+w_{23}x_3+b_2  
\end{aligned}  
$$

Contracted:

$$  
\boxed{y=Wx+b}  
$$

The matrix form is simply a **compact way of writing all the individual neuron calculations together**.

![](assets/Pasted%20image%2020260911195321.png)